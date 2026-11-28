"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./garage.module.css";

type Option = { value: string; label: string; manualText?: string };
type Group = { label?: string; options: Option[] };

export function dropdownOptions(values: readonly (string | number)[]): Option[] {
  return values.map((value) => ({ value: String(value), label: String(value) }));
}

const normalize = (text: string) =>
  text.normalize("NFKD").toLowerCase().replace(/\p{M}/gu, "").replace(/[^\p{L}\p{N}]/gu, "");

export default function GarageDropdown({
  label, placeholder, name, value, groups, disabled, required, onChange, noResults, manual,
}: {
  label: string;
  placeholder: string;
  name?: string;
  value: string;
  groups: Group[];
  disabled?: boolean;
  required?: boolean;
  onChange: (value: string) => void;
  noResults: string;
  manual?: { label: string; valid: (text: string) => boolean; onCommit: (text: string) => void };
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const expanded = open && !disabled;
  const selected = groups.flatMap((group) => group.options).find((option) => option.value === value);
  const term = normalize(query);
  const words = query.trim().split(/\s+/).map(normalize).filter(Boolean);
  const filtered = groups.map(({ label, options }) => ({
    label,
    options: options.filter((option) => words.every((word) => normalize(option.label).includes(word))),
  }));
  const matches = filtered.flatMap((group) => group.options);
  const typed = query.trim();
  if (typed && manual?.valid(typed) && !matches.some((option) => normalize(option.label) === term)) {
    filtered.push({ label: undefined, options: [{ value: "__typed__", label: manual.label.replace("{value}", () => typed), manualText: typed }] });
  }
  const options = filtered.flatMap((group) => group.options);

  function begin(index = -1) {
    setQuery("");
    setActive(index);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    setQuery("");
    setActive(-1);
  }

  function choose(option: Option) {
    if (option.manualText) manual?.onCommit(option.manualText);
    else onChange(option.value);
    close();
    input.current?.focus();
  }

  function handleKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return;
    if (event.key === "Escape" && expanded) {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const down = event.key === "ArrowDown";
      if (!expanded) begin(down ? 0 : options.length - 1);
      else if (options.length) setActive(down ? Math.min(active + 1, options.length - 1) : active <= 0 ? options.length - 1 : active - 1);
    } else if (event.key === "Enter" && expanded) {
      event.preventDefault();
      const option = options[active] ?? (options.length === 1 ? options[0] : undefined);
      if (option) choose(option);
    }
  }

  return (
    <div className={styles.dropdown} onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) close();
    }}>
      <label htmlFor={id}>{label}</label>
      {name && <input type="hidden" name={name} value={value} disabled={disabled} />}
      <div className={styles.dropdownTrigger}>
        <input ref={input} id={id} type="text" role="combobox" aria-autocomplete="list" autoComplete="off"
          aria-expanded={expanded} aria-controls={expanded ? id + "-list" : undefined}
          aria-activedescendant={expanded && options[active] ? id + "-option-" + active : undefined}
          aria-required={required} disabled={disabled} className={styles.dropdownInput}
          placeholder={selected?.label ?? placeholder}
          value={expanded ? query : selected?.label ?? ""}
          onFocus={(event) => event.currentTarget.select()}
          onClick={() => { if (!expanded) begin(); }}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onKeyDown={handleKey} />
        <button type="button" tabIndex={-1} disabled={disabled} className={styles.dropdownToggle}
          aria-label={label} aria-expanded={expanded}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => {
            input.current?.focus();
            if (expanded) close();
            else begin();
          }}>
          <span className={styles.dropdownChevron} aria-hidden="true" />
        </button>
      </div>
      {expanded && (
        <div id={id + "-list"} role="listbox" aria-label={label} className={styles.dropdownList}
          onMouseDown={(event) => event.preventDefault()}>
          {!options.length && <div role="status" className={styles.dropdownGroup}>{noResults}</div>}
          {filtered.filter((group) => group.options.length).map((group) => (
            <div key={group.label ?? group.options[0].value} role={group.label ? "group" : "presentation"} aria-label={group.label}>
              {group.label && <div className={styles.dropdownGroup} aria-hidden="true">{group.label}</div>}
              {group.options.map((option) => {
                const index = options.indexOf(option);
                return (
                  <div key={option.value} id={id + "-option-" + index} role="option" aria-selected={option.value === value}
                    className={styles.dropdownOption} data-active={index === active}
                    ref={(element) => {
                      if (element && index === active) element.scrollIntoView({ block: "nearest" });
                    }}
                    onClick={() => choose(option)}>
                    {option.label}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
