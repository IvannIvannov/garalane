param(
  [Parameter(Mandatory = $true)]
  [string]$CsvPath
)

# US DOE/EPA Fuel Economy vehicle dataset: https://www.fueleconomy.gov/feg/download.shtml
$garage = Join-Path $PSScriptRoot '../src/app/[locale]/garage'
$catalog = Get-Content -Raw -LiteralPath (Join-Path $garage 'vehicle-catalog.json') | ConvertFrom-Json -AsHashtable

function Normalize-Name([string]$value) {
  return $value.Normalize([Text.NormalizationForm]::FormD).ToLowerInvariant() -replace '[^a-z0-9]', ''
}

$makes = @{}
$models = @{}
foreach ($make in $catalog.Keys) {
  $makes[(Normalize-Name $make)] = $make
  $names = @{}
  foreach ($model in $catalog[$make]) { $names[(Normalize-Name $model)] = $model }
  $models[$make] = $names
}
$makes['volkswagen'] = 'VW'

$records = [System.Collections.Generic.HashSet[string]]::new()
foreach ($row in (Import-Csv -LiteralPath $CsvPath -Encoding utf8)) {
  $make = $makes[(Normalize-Name $row.make)]
  if (!$make -or !$row.model -or !$row.year) { continue }

  $names = $models[$make]
  $model = $names[(Normalize-Name $row.model)]
  if (!$model) { $model = $names[(Normalize-Name $row.baseModel)] }
  if (!$model -and $make -eq 'BMW' -and $row.model -match '^(\d{3})[ide]\b') {
    $model = $names[$Matches[1]]
  }
  if (!$model) { continue }

  $fuel = switch ($row.atvType) {
    'Hybrid' { 'hybrid' }
    'Plug-in Hybrid' { 'plugInHybrid' }
    'EV' { 'electric' }
    'FCV' { 'hydrogen' }
    'eFCV' { 'hydrogen' }
    'FFV' { 'ethanol' }
    'CNG' { 'cng' }
    'Bifuel (CNG)' { 'cng' }
    'Bifuel (LPG)' { 'lpg' }
    default {
      switch ($row.fuelType1) {
        'Diesel' { 'diesel' }
        'Electricity' { 'electric' }
        { $_ -in 'Regular Gasoline', 'Premium Gasoline', 'Midgrade Gasoline' } { 'petrol' }
      }
    }
  }
  if (!$fuel) { continue }

  $label = @($row.model)
  if ([double]$row.displ -gt 0) { $label += "$($row.displ) L" }
  if ($row.cylinders -match '^[1-9][0-9]*$') { $label += "$($row.cylinders) cyl." }
  $engine = ($row.eng_dscr -replace '^\s*[,;]|^\s*', '').Trim()
  if ($engine) { $label += $engine }
  if ($row.evMotor) { $label += $row.evMotor }
  if ($label.Count -eq 1) { continue }
  $label = ($label -join ' · ') + ' · US EPA'
  if ($label.Length -gt 160) { continue }
  $year = [int]$row.year
  $record = ConvertTo-Json -Compress -InputObject @($make, $model, $fuel, $year, $year, $label)
  [void]$records.Add($record)
}

if ($records.Count -lt 1000) { throw 'Unexpectedly small EPA engine catalog.' }
$sorted = $records | Sort-Object -CaseSensitive
Set-Content -Encoding utf8 -LiteralPath (Join-Path $garage 'epa-engine-catalog.json') -Value ("[`n  " + ($sorted -join ",`n  ") + "`n]")
Write-Output "Imported $($records.Count) EPA model-year records."
