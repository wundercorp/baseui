import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type DetailsHTMLAttributes,
  type DialogHTMLAttributes,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type LabelHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TableHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react";

export type BaseUITheme = "light" | "dark" | "system";
export type BaseUISize = "small" | "medium" | "large";
export type BaseUITone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

interface BaseUIContextValue {
  theme: BaseUITheme;
  setTheme: (theme: BaseUITheme) => void;
}

const BaseUIContext = createContext<BaseUIContextValue | undefined>(undefined);

export interface BaseUIProviderProps {
  children: ReactNode;
  theme?: BaseUITheme;
  defaultTheme?: BaseUITheme;
  onThemeChange?: (theme: BaseUITheme) => void;
  className?: string;
}

export function BaseUIProvider({
  children,
  theme,
  defaultTheme = "light",
  onThemeChange,
  className,
}: BaseUIProviderProps) {
  const [internalTheme, setInternalTheme] = useState<BaseUITheme>(defaultTheme);
  const activeTheme = theme ?? internalTheme;
  const setTheme = useCallback((nextTheme: BaseUITheme) => {
    if (theme === undefined) {
      setInternalTheme(nextTheme);
    }
    onThemeChange?.(nextTheme);
  }, [onThemeChange, theme]);
  const value = useMemo(() => ({ theme: activeTheme, setTheme }), [activeTheme, setTheme]);

  return (
    <BaseUIContext.Provider value={value}>
      <div className={classNames("bui-root", className)} data-bui-theme={activeTheme}>
        {children}
      </div>
    </BaseUIContext.Provider>
  );
}

export function useBaseUI() {
  const context = useContext(BaseUIContext);
  if (!context) {
    throw new Error("useBaseUI must be used within BaseUIProvider");
  }
  return context;
}

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  padding?: "none" | "small" | "medium" | "large";
  surface?: "none" | "default" | "subtle" | "muted";
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { className, padding = "none", surface = "none", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        "bui-box",
        `bui-box-padding-${padding}`,
        `bui-box-surface-${surface}`,
        className,
      )}
      {...props}
    />
  );
});

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "stretch" | "start" | "center" | "end";
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { className, gap = "md", align = "stretch", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames("bui-stack", `bui-gap-${gap}`, `bui-align-${align}`, className)}
      {...props}
    />
  );
});

export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  align?: "start" | "center" | "end" | "baseline";
  justify?: "start" | "center" | "end" | "between";
  wrap?: boolean;
}

export const Inline = forwardRef<HTMLDivElement, InlineProps>(function Inline(
  { className, gap = "sm", align = "center", justify = "start", wrap = true, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        "bui-inline",
        `bui-gap-${gap}`,
        `bui-align-${align}`,
        `bui-justify-${justify}`,
        wrap && "bui-wrap",
        className,
      )}
      {...props}
    />
  );
});

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  minColumnWidth?: string;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { className, columns = 2, gap = "md", minColumnWidth, style, ...props },
  ref,
) {
  const gridStyle: CSSProperties = minColumnWidth
    ? { gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minColumnWidth}), 1fr))`, ...style }
    : style ?? {};
  return (
    <div
      ref={ref}
      className={classNames("bui-grid", `bui-grid-${columns}`, `bui-gap-${gap}`, className)}
      style={gridStyle}
      {...props}
    />
  );
});

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "narrow" | "default" | "wide" | "full";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { className, size = "default", ...props },
  ref,
) {
  return <div ref={ref} className={classNames("bui-container", `bui-container-${size}`, className)} {...props} />;
});

export function Spacer({ size = "md" }: { size?: "xs" | "sm" | "md" | "lg" | "xl" }) {
  return <div className={classNames("bui-spacer", `bui-spacer-${size}`)} aria-hidden="true" />;
}

export function Divider({ className = "", ...props }: HTMLAttributes<HTMLHRElement>) {
  return <hr className={classNames("bui-divider", className)} {...props} />;
}

export function VisuallyHidden({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={classNames("bui-visually-hidden", className)} {...props} />;
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "display" | "h1" | "h2" | "h3" | "h4" | "h5";
}

export function Heading({ level = 2, size, className, ...props }: HeadingProps) {
  const headingClassName = classNames("bui-heading", `bui-heading-${size ?? `h${Math.min(level, 5)}`}`, className);
  if (level === 1) return <h1 className={headingClassName} {...props} />;
  if (level === 2) return <h2 className={headingClassName} {...props} />;
  if (level === 3) return <h3 className={headingClassName} {...props} />;
  if (level === 4) return <h4 className={headingClassName} {...props} />;
  if (level === 5) return <h5 className={headingClassName} {...props} />;
  return <h6 className={headingClassName} {...props} />;
}

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "md" | "lg";
  tone?: "primary" | "secondary" | "tertiary" | "inverse";
  weight?: "regular" | "medium" | "semibold" | "bold";
  as?: "p" | "span" | "div";
}

export function Text({
  as = "p",
  size = "md",
  tone = "secondary",
  weight = "regular",
  className,
  ...props
}: TextProps) {
  const Element = as;
  return (
    <Element
      className={classNames(
        "bui-text",
        `bui-text-${size}`,
        `bui-text-${tone}`,
        `bui-weight-${weight}`,
        className,
      )}
      {...props}
    />
  );
}

export function Eyebrow({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return <span className={classNames("bui-eyebrow", className)} {...props} />;
}

export function Label({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={classNames("bui-label", className)} {...props} />;
}

export function Link({ className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={classNames("bui-link", className)} {...props} />;
}

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "link" | "default";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: BaseUISize;
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    variant = "primary",
    size = "medium",
    loading = false,
    leadingIcon,
    trailingIcon,
    fullWidth = false,
    children,
    disabled,
    ...props
  },
  ref,
) {
  const normalizedVariant = variant === "default" ? "primary" : variant;
  return (
    <button
      ref={ref}
      className={classNames(
        "bui-button",
        "button",
        `bui-button-${normalizedVariant}`,
        `button-${variant}`,
        `bui-control-${size}`,
        fullWidth && "bui-full-width",
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <Spinner size="small" /> : leadingIcon}
      <span className="bui-button-label">{children}</span>
      {trailingIcon}
    </button>
  );
});

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: Exclude<ButtonVariant, "link" | "default">;
  size?: BaseUISize;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, variant = "ghost", size = "medium", className, children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={classNames("bui-icon-button", `bui-button-${variant}`, `bui-control-${size}`, className)}
      aria-label={label}
      title={label}
      {...props}
    >
      {children}
    </button>
  );
});

export function ButtonGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bui-button-group", className)} role="group" {...props} />;
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "interactive" | "elevated";
  padding?: "none" | "small" | "medium" | "large";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, variant = "default", padding = "medium", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        "bui-card",
        "card",
        `bui-card-${variant}`,
        `bui-card-padding-${padding}`,
        className,
      )}
      {...props}
    />
  );
});

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bui-card-header", className)} {...props} />;
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bui-card-content", className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bui-card-footer", className)} {...props} />;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BaseUITone;
  size?: "small" | "medium";
  dot?: boolean;
}

export function Badge({ className, tone = "neutral", size = "medium", dot = false, children, ...props }: BadgeProps) {
  return (
    <span className={classNames("bui-badge", "badge", `bui-tone-${tone}`, `bui-badge-${size}`, className)} {...props}>
      {dot ? <span className="bui-badge-dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

export interface StatusBadgeProps extends BadgeProps {
  status?: "online" | "offline" | "pending" | "error" | "paused";
}

export function StatusBadge({ status = "online", children, ...props }: StatusBadgeProps) {
  const tone: BaseUITone = status === "online" ? "success" : status === "pending" || status === "paused" ? "warning" : status === "error" ? "danger" : "neutral";
  return <Badge tone={tone} dot {...props}>{children ?? status}</Badge>;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: Exclude<BaseUITone, "accent">;
  title?: ReactNode;
  actions?: ReactNode;
  dismissLabel?: string;
  onDismiss?: () => void;
}

export function Alert({
  className,
  tone = "info",
  title,
  actions,
  dismissLabel = "Dismiss",
  onDismiss,
  children,
  ...props
}: AlertProps) {
  return (
    <div className={classNames("bui-alert", `bui-tone-${tone}`, className)} role={tone === "danger" ? "alert" : "status"} {...props}>
      <div className="bui-alert-marker" aria-hidden="true" />
      <div className="bui-alert-content">
        {title ? <strong className="bui-alert-title">{title}</strong> : null}
        <div className="bui-alert-body">{children}</div>
        {actions ? <div className="bui-alert-actions">{actions}</div> : null}
      </div>
      {onDismiss ? <IconButton label={dismissLabel} size="small" onClick={onDismiss}>×</IconButton> : null}
    </div>
  );
}

export const Callout = Alert;

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  status?: "online" | "offline" | "busy";
}

export function Avatar({ className, src, alt = "", initials, size = "medium", status, ...props }: AvatarProps) {
  return (
    <span className={classNames("bui-avatar", `bui-avatar-${size}`, className)} {...props}>
      {src ? <img src={src} alt={alt} /> : <span aria-hidden={Boolean(alt)}>{initials ?? "?"}</span>}
      {alt && !src ? <VisuallyHidden>{alt}</VisuallyHidden> : null}
      {status ? <span className={classNames("bui-avatar-status", `is-${status}`)} aria-label={status} /> : null}
    </span>
  );
}

export function AvatarGroup({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bui-avatar-group", className)} {...props} />;
}

export interface FieldProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode;
  htmlFor?: string;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  optionalLabel?: ReactNode;
}

export function Field({
  className,
  label,
  htmlFor,
  description,
  error,
  required,
  optionalLabel = "Optional",
  children,
  ...props
}: FieldProps) {
  return (
    <div className={classNames("bui-field", Boolean(error) && "is-invalid", className)} {...props}>
      <div className="bui-field-label-row">
        <Label htmlFor={htmlFor}>{label}{required ? <span className="bui-required">*</span> : null}</Label>
        {!required && optionalLabel ? <span className="bui-field-optional">{optionalLabel}</span> : null}
      </div>
      {description ? <div className="bui-field-description">{description}</div> : null}
      {children}
      {error ? <div className="bui-field-error" role="alert">{error}</div> : null}
    </div>
  );
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: BaseUISize;
  invalid?: boolean;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, size = "medium", invalid = false, startAdornment, endAdornment, ...props },
  ref,
) {
  if (startAdornment || endAdornment) {
    return (
      <span className={classNames("bui-input-shell", `bui-control-${size}`, invalid && "is-invalid", className)}>
        {startAdornment ? <span className="bui-input-adornment">{startAdornment}</span> : null}
        <input ref={ref} className="bui-input bui-input-inner" aria-invalid={invalid || undefined} {...props} />
        {endAdornment ? <span className="bui-input-adornment">{endAdornment}</span> : null}
      </span>
    );
  }
  return <input ref={ref} className={classNames("bui-input", `bui-control-${size}`, invalid && "is-invalid", className)} aria-invalid={invalid || undefined} {...props} />;
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid = false, resize = "vertical", style, ...props },
  ref,
) {
  return <textarea ref={ref} className={classNames("bui-textarea", invalid && "is-invalid", className)} aria-invalid={invalid || undefined} style={{ resize, ...style }} {...props} />;
});

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: BaseUISize;
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, size = "medium", invalid = false, ...props },
  ref,
) {
  return <select ref={ref} className={classNames("bui-select", `bui-control-${size}`, invalid && "is-invalid", className)} aria-invalid={invalid || undefined} {...props} />;
});

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { className, label, description, ...props },
  ref,
) {
  return (
    <label className={classNames("bui-choice", className)}>
      <input ref={ref} type="checkbox" className="bui-choice-input" {...props} />
      <span className="bui-choice-control" aria-hidden="true" />
      <span className="bui-choice-copy"><strong>{label}</strong>{description ? <small>{description}</small> : null}</span>
    </label>
  );
});

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { className, label, description, ...props },
  ref,
) {
  return (
    <label className={classNames("bui-choice bui-radio", className)}>
      <input ref={ref} type="radio" className="bui-choice-input" {...props} />
      <span className="bui-choice-control" aria-hidden="true" />
      <span className="bui-choice-copy"><strong>{label}</strong>{description ? <small>{description}</small> : null}</span>
    </label>
  );
});

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: ReactNode;
  description?: ReactNode;
  size?: "small" | "medium";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
  { className, label, description, size = "medium", ...props },
  ref,
) {
  return (
    <label className={classNames("bui-switch-row", className)}>
      <span className="bui-choice-copy"><strong>{label}</strong>{description ? <small>{description}</small> : null}</span>
      <span className={classNames("bui-switch", `bui-switch-${size}`)}>
        <input ref={ref} type="checkbox" {...props} />
        <span aria-hidden="true" />
      </span>
    </label>
  );
});

export interface SliderProps extends InputHTMLAttributes<HTMLInputElement> {
  valueLabel?: ReactNode;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(function Slider(
  { className, valueLabel, ...props },
  ref,
) {
  return (
    <div className={classNames("bui-slider", className)}>
      <input ref={ref} type="range" {...props} />
      {valueLabel ? <span>{valueLabel}</span> : null}
    </div>
  );
});

export interface FileUploadProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "title"> {
  title?: ReactNode;
  description?: ReactNode;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
  { className, title = "Choose a file", description = "or drag and drop", ...props },
  ref,
) {
  return (
    <label className={classNames("bui-file-upload", className)}>
      <input ref={ref} type="file" {...props} />
      <span className="bui-file-upload-icon" aria-hidden="true">↑</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </label>
  );
});

export interface SearchInputProps extends Omit<InputProps, "type" | "startAdornment"> {
  clearLabel?: string;
  onClear?: () => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(function SearchInput(
  { clearLabel = "Clear search", onClear, value, ...props },
  ref,
) {
  return (
    <Input
      ref={ref}
      type="search"
      value={value}
      startAdornment={<span aria-hidden="true">⌕</span>}
      endAdornment={onClear && value ? <IconButton label={clearLabel} size="small" onClick={onClear}>×</IconButton> : undefined}
      {...props}
    />
  );
});

export function FormSection({ className, ...props }: HTMLAttributes<HTMLFieldSetElement>) {
  return <fieldset className={classNames("bui-form-section", className)} {...props} />;
}

export function FormActions({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bui-form-actions", className)} {...props} />;
}

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  items: Array<{ value: string; label: ReactNode; disabled?: boolean; count?: number }>;
  size?: "small" | "medium";
  variant?: "line" | "contained";
}

export function Tabs({ className, value, onValueChange, items, size = "medium", variant = "line", ...props }: TabsProps) {
  return (
    <div className={classNames("bui-tabs", `bui-tabs-${size}`, `bui-tabs-${variant}`, className)} role="tablist" {...props}>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={item.value === value}
          disabled={item.disabled}
          className={item.value === value ? "is-active" : undefined}
          onClick={() => onValueChange(item.value)}
        >
          {item.label}
          {typeof item.count === "number" ? <span className="bui-tab-count">{item.count}</span> : null}
        </button>
      ))}
    </div>
  );
}

export interface SegmentedControlProps extends Omit<TabsProps, "variant"> {}

export function SegmentedControl(props: SegmentedControlProps) {
  return <Tabs {...props} variant="contained" />;
}

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  return (
    <nav className={classNames("bui-breadcrumbs", className)} aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {index > 0 ? <span className="bui-breadcrumb-separator" aria-hidden="true">/</span> : null}
            {item.href ? <a href={item.href}>{item.label}</a> : item.onClick ? <button type="button" onClick={item.onClick}>{item.label}</button> : <span aria-current={index === items.length - 1 ? "page" : undefined}>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

export function Pagination({ page, pageCount, onPageChange, siblingCount = 1, className }: PaginationProps) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1).filter(
    (candidate) => candidate === 1 || candidate === pageCount || Math.abs(candidate - page) <= siblingCount,
  );
  const visiblePages = pages.reduce<Array<number | "ellipsis">>((result, candidate, index) => {
    const previous = pages[index - 1];
    if (previous && candidate - previous > 1) {
      result.push("ellipsis");
    }
    result.push(candidate);
    return result;
  }, []);

  return (
    <nav className={classNames("bui-pagination", className)} aria-label="Pagination">
      <IconButton label="Previous page" size="small" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>‹</IconButton>
      {visiblePages.map((item, index) => item === "ellipsis" ? <span key={`ellipsis-${index}`} className="bui-pagination-ellipsis">…</span> : (
        <button key={item} type="button" className={item === page ? "is-active" : undefined} aria-current={item === page ? "page" : undefined} onClick={() => onPageChange(item)}>{item}</button>
      ))}
      <IconButton label="Next page" size="small" disabled={page >= pageCount} onClick={() => onPageChange(page + 1)}>›</IconButton>
    </nav>
  );
}

export function Progress({
  value,
  max = 100,
  label,
  showValue = false,
  tone = "accent",
  className,
}: {
  value: number;
  max?: number;
  label?: ReactNode;
  showValue?: boolean;
  tone?: BaseUITone;
  className?: string;
}) {
  const percentage = Math.max(0, Math.min(100, max > 0 ? (value / max) * 100 : 0));
  return (
    <div className={classNames("bui-progress", `bui-tone-${tone}`, className)}>
      {label || showValue ? <div className="bui-progress-label"><span>{label}</span>{showValue ? <strong>{Math.round(percentage)}%</strong> : null}</div> : null}
      <div className="bui-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value}>
        <span style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}

export function Meter({
  value,
  min = 0,
  max = 100,
  low,
  high,
  optimum,
  label,
  className,
}: {
  value: number;
  min?: number;
  max?: number;
  low?: number;
  high?: number;
  optimum?: number;
  label?: ReactNode;
  className?: string;
}) {
  return (
    <div className={classNames("bui-meter", className)}>
      {label ? <span>{label}</span> : null}
      <meter value={value} min={min} max={max} low={low} high={high} optimum={optimum} />
    </div>
  );
}

export function Spinner({ size = "medium", label = "Loading" }: { size?: BaseUISize; label?: string }) {
  return <span className={classNames("bui-spinner", `bui-spinner-${size}`)} role="status" aria-label={label} />;
}

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  lines?: number;
}

export function Skeleton({ className, width, height, lines = 1, style, ...props }: SkeletonProps) {
  if (lines > 1) {
    return (
      <div className={classNames("bui-skeleton-group", className)} {...props}>
        {Array.from({ length: lines }, (_, index) => <span key={index} className="bui-skeleton" style={{ width: index === lines - 1 ? "72%" : width, height }} />)}
      </div>
    );
  }
  return <div className={classNames("bui-skeleton", className)} style={{ width, height, ...style }} {...props} />;
}

export interface MetricCardProps extends CardProps {
  label: ReactNode;
  value: ReactNode;
  change?: ReactNode;
  trend?: "up" | "down" | "neutral";
  detail?: ReactNode;
  icon?: ReactNode;
}

export function MetricCard({ label, value, change, trend = "neutral", detail, icon, className, ...props }: MetricCardProps) {
  return (
    <Card className={classNames("bui-metric-card", className)} {...props}>
      <div className="bui-metric-card-header"><span>{label}</span>{icon ? <span className="bui-metric-card-icon">{icon}</span> : null}</div>
      <div className="bui-metric-card-value">{value}</div>
      {change || detail ? <div className="bui-metric-card-footer">{change ? <span className={classNames("bui-metric-change", `is-${trend}`)}>{change}</span> : null}{detail ? <span>{detail}</span> : null}</div> : null}
    </Card>
  );
}

export function Stat({
  label,
  value,
  description,
  className,
}: {
  label: ReactNode;
  value: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return <div className={classNames("bui-stat", className)}><span>{label}</span><strong>{value}</strong>{description ? <small>{description}</small> : null}</div>;
}

export function EmptyState({
  icon,
  title,
  description,
  actions,
  compact = false,
  className,
}: {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  compact?: boolean;
  className?: string;
}) {
  return (
    <div className={classNames("bui-empty-state", compact && "is-compact", className)}>
      {icon ? <div className="bui-empty-state-icon">{icon}</div> : null}
      <Heading level={3} size="h4">{title}</Heading>
      {description ? <Text>{description}</Text> : null}
      {actions ? <div className="bui-empty-state-actions">{actions}</div> : null}
    </div>
  );
}

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  density?: "comfortable" | "compact";
  striped?: boolean;
}

export function Table({ className, density = "comfortable", striped = false, ...props }: TableProps) {
  return <table className={classNames("bui-table", `bui-table-${density}`, striped && "bui-table-striped", className)} {...props} />;
}

export function TableContainer({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames("bui-table-container", className)} {...props} />;
}

export function DescriptionList({ className, ...props }: HTMLAttributes<HTMLDListElement>) {
  return <dl className={classNames("bui-description-list", className)} {...props} />;
}

export function DescriptionItem({ term, children, className }: { term: ReactNode; children: ReactNode; className?: string }) {
  return <div className={classNames("bui-description-item", className)}><dt>{term}</dt><dd>{children}</dd></div>;
}

export function List({ className, divided = false, ...props }: HTMLAttributes<HTMLUListElement> & { divided?: boolean }) {
  return <ul className={classNames("bui-list", divided && "bui-list-divided", className)} {...props} />;
}

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  leading?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  trailing?: ReactNode;
}

export function ListItem({ leading, title, description, trailing, className, ...props }: ListItemProps) {
  return <li className={classNames("bui-list-item", className)} {...props}>{leading ? <span className="bui-list-item-leading">{leading}</span> : null}<span className="bui-list-item-content"><strong>{title}</strong>{description ? <small>{description}</small> : null}</span>{trailing ? <span className="bui-list-item-trailing">{trailing}</span> : null}</li>;
}

export function Code({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <code className={classNames("bui-code", className)} {...props} />;
}

export interface CodeBlockProps extends Omit<HTMLAttributes<HTMLPreElement>, "title"> {
  language?: string;
  title?: ReactNode;
  actions?: ReactNode;
}

export function CodeBlock({ className, language, title, actions, children, ...props }: CodeBlockProps) {
  return (
    <div className="bui-code-block-shell">
      {title || language || actions ? <div className="bui-code-block-header"><span>{title ?? language}</span>{actions}</div> : null}
      <pre className={classNames("bui-code-block", "code-block", className)} {...props}><code>{children}</code></pre>
    </div>
  );
}

export function Kbd({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <kbd className={classNames("bui-kbd", className)} {...props} />;
}

export function CopyButton({
  value,
  label = "Copy",
  copiedLabel = "Copied",
  size = "small",
  variant = "ghost",
}: {
  value: string;
  label?: string;
  copiedLabel?: string;
  size?: BaseUISize;
  variant?: ButtonVariant;
}) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return <Button type="button" size={size} variant={variant} onClick={() => void copy()}>{copied ? copiedLabel : label}</Button>;
}

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
}

export function Accordion({ className, multiple = false, children, ...props }: AccordionProps) {
  return <div className={classNames("bui-accordion", className)} data-multiple={multiple || undefined} {...props}>{children}</div>;
}

export interface AccordionItemProps extends Omit<DetailsHTMLAttributes<HTMLDetailsElement>, "title"> {
  title: ReactNode;
  description?: ReactNode;
}

export function AccordionItem({ className, title, description, children, ...props }: AccordionItemProps) {
  return <details className={classNames("bui-accordion-item", className)} {...props}><summary><span><strong>{title}</strong>{description ? <small>{description}</small> : null}</span><span className="bui-accordion-chevron" aria-hidden="true">+</span></summary><div className="bui-accordion-content">{children}</div></details>;
}

export function Collapsible({ title, children, open, className }: { title: ReactNode; children: ReactNode; open?: boolean; className?: string }) {
  return <AccordionItem title={title} open={open} className={className}>{children}</AccordionItem>;
}

export interface StepperItem {
  title: ReactNode;
  description?: ReactNode;
  status?: "complete" | "current" | "upcoming" | "error";
}

export function Stepper({ items, orientation = "horizontal", className }: { items: StepperItem[]; orientation?: "horizontal" | "vertical"; className?: string }) {
  return <ol className={classNames("bui-stepper", `bui-stepper-${orientation}`, className)}>{items.map((item, index) => <li key={index} className={`is-${item.status ?? "upcoming"}`}><span className="bui-stepper-marker">{item.status === "complete" ? "✓" : index + 1}</span><span className="bui-stepper-copy"><strong>{item.title}</strong>{item.description ? <small>{item.description}</small> : null}</span></li>)}</ol>;
}

export interface TimelineItem {
  title: ReactNode;
  description?: ReactNode;
  timestamp?: ReactNode;
  tone?: BaseUITone;
}

export function Timeline({ items, className }: { items: TimelineItem[]; className?: string }) {
  return <ol className={classNames("bui-timeline", className)}>{items.map((item, index) => <li key={index} className={`bui-tone-${item.tone ?? "neutral"}`}><span className="bui-timeline-marker" aria-hidden="true" /><div><div className="bui-timeline-heading"><strong>{item.title}</strong>{item.timestamp ? <time>{item.timestamp}</time> : null}</div>{item.description ? <p>{item.description}</p> : null}</div></li>)}</ol>;
}

export interface DialogProps extends Omit<DialogHTMLAttributes<HTMLDivElement>, "title"> {
  open: boolean;
  title: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  onClose: () => void;
  closeLabel?: string;
  size?: "small" | "medium" | "large";
}

export function Dialog({ open, title, description, footer, onClose, closeLabel = "Close", size = "medium", className, children, ...props }: DialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
  if (!open) {
    return null;
  }
  return (
    <div className="bui-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div className={classNames("bui-dialog", `bui-dialog-${size}`, className)} role="dialog" aria-modal="true" {...props}>
        <div className="bui-dialog-header"><div><Heading level={2} size="h3">{title}</Heading>{description ? <Text size="sm">{description}</Text> : null}</div><IconButton label={closeLabel} onClick={onClose}>×</IconButton></div>
        <div className="bui-dialog-content">{children}</div>
        {footer ? <div className="bui-dialog-footer">{footer}</div> : null}
      </div>
    </div>
  );
}

export interface DrawerProps extends Omit<DialogProps, "size"> {
  side?: "left" | "right";
  width?: "small" | "medium" | "large";
}

export function Drawer({ open, title, description, footer, onClose, closeLabel = "Close", side = "right", width = "medium", className, children, ...props }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
  if (!open) return null;
  return <div className="bui-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><aside className={classNames("bui-drawer", `bui-drawer-${side}`, `bui-drawer-${width}`, className)} role="dialog" aria-modal="true" {...props}><div className="bui-dialog-header"><div><Heading level={2} size="h3">{title}</Heading>{description ? <Text size="sm">{description}</Text> : null}</div><IconButton label={closeLabel} onClick={onClose}>×</IconButton></div><div className="bui-dialog-content">{children}</div>{footer ? <div className="bui-dialog-footer">{footer}</div> : null}</aside></div>;
}

export function Tooltip({ content, children, side = "top", className }: { content: ReactNode; children: ReactNode; side?: "top" | "right" | "bottom" | "left"; className?: string }) {
  return <span className={classNames("bui-tooltip", `bui-tooltip-${side}`, className)}><span className="bui-tooltip-trigger">{children}</span><span className="bui-tooltip-content" role="tooltip">{content}</span></span>;
}

export function Popover({ trigger, children, align = "start", className }: { trigger: ReactNode; children: ReactNode; align?: "start" | "center" | "end"; className?: string }) {
  return <details className={classNames("bui-popover", `bui-popover-${align}`, className)}><summary>{trigger}</summary><div className="bui-popover-content">{children}</div></details>;
}

export function DropdownMenu({ trigger, children, align = "end", className }: { trigger: ReactNode; children: ReactNode; align?: "start" | "end"; className?: string }) {
  return <details className={classNames("bui-dropdown", `bui-dropdown-${align}`, className)}><summary>{trigger}</summary><div className="bui-dropdown-menu" role="menu">{children}</div></details>;
}

export function DropdownItem({ className, destructive = false, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { destructive?: boolean }) {
  return <button type="button" className={classNames("bui-dropdown-item", destructive && "is-destructive", className)} role="menuitem" {...props} />;
}

export interface ToastProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: BaseUITone;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  onDismiss?: () => void;
}

export function Toast({ tone = "neutral", title, description, action, onDismiss, className, ...props }: ToastProps) {
  return <div className={classNames("bui-toast", `bui-tone-${tone}`, className)} role="status" {...props}><div className="bui-toast-marker" /><div className="bui-toast-content"><strong>{title}</strong>{description ? <p>{description}</p> : null}{action ? <div>{action}</div> : null}</div>{onDismiss ? <IconButton label="Dismiss notification" size="small" onClick={onDismiss}>×</IconButton> : null}</div>;
}

export function ToastRegion({ position = "bottom-right", className, ...props }: HTMLAttributes<HTMLDivElement> & { position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  return <div className={classNames("bui-toast-region", `bui-toast-${position}`, className)} aria-live="polite" {...props} />;
}

export interface NavigationItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  badge?: ReactNode;
  disabled?: boolean;
}

export function Sidebar({
  brand,
  items,
  activeItem,
  onItemSelect,
  footer,
  collapsed = false,
  className,
}: {
  brand?: ReactNode;
  items: NavigationItem[];
  activeItem?: string;
  onItemSelect?: (item: NavigationItem) => void;
  footer?: ReactNode;
  collapsed?: boolean;
  className?: string;
}) {
  return <aside className={classNames("bui-sidebar", collapsed && "is-collapsed", className)}>{brand ? <div className="bui-sidebar-brand">{brand}</div> : null}<nav className="bui-sidebar-nav">{items.map((item) => <button key={item.id} type="button" className={item.id === activeItem ? "is-active" : undefined} aria-current={item.id === activeItem ? "page" : undefined} disabled={item.disabled} title={collapsed && typeof item.label === "string" ? item.label : undefined} onClick={() => onItemSelect?.(item)}>{item.icon ? <span className="bui-sidebar-icon">{item.icon}</span> : null}<span className="bui-sidebar-label">{item.label}</span>{item.badge ? <span className="bui-sidebar-badge">{item.badge}</span> : null}</button>)}</nav>{footer ? <div className="bui-sidebar-footer">{footer}</div> : null}</aside>;
}

export function Topbar({ title, leading, actions, className }: { title?: ReactNode; leading?: ReactNode; actions?: ReactNode; className?: string }) {
  return <header className={classNames("bui-topbar", className)}>{leading ? <div className="bui-topbar-leading">{leading}</div> : null}{title ? <div className="bui-topbar-title">{title}</div> : null}{actions ? <div className="bui-topbar-actions">{actions}</div> : null}</header>;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  breadcrumbs,
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
  className?: string;
}) {
  return <header className={classNames("bui-page-header", className)}>{breadcrumbs}<div className="bui-page-header-row"><div className="bui-page-header-copy">{eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}<Heading level={1} size="h1">{title}</Heading>{description ? <Text size="lg">{description}</Text> : null}</div>{actions ? <div className="bui-page-header-actions">{actions}</div> : null}</div></header>;
}

export function AppShell({ sidebar, topbar, children, className }: { sidebar?: ReactNode; topbar?: ReactNode; children: ReactNode; className?: string }) {
  return <div className={classNames("bui-app-shell", className)}>{sidebar}<div className="bui-app-workspace">{topbar}<main className="bui-app-content">{children}</main></div></div>;
}

export function LogoMark({ label = "B", className }: { label?: ReactNode; className?: string }) {
  return <span className={classNames("bui-logo-mark", className)} aria-hidden="true">{label}</span>;
}

export function CommandMenu({
  label = "Command menu",
  query,
  onQueryChange,
  groups,
  onSelect,
  className,
}: {
  label?: string;
  query: string;
  onQueryChange: (value: string) => void;
  groups: Array<{ label: ReactNode; items: Array<{ id: string; label: ReactNode; description?: ReactNode; shortcut?: ReactNode }> }>;
  onSelect?: (id: string) => void;
  className?: string;
}) {
  return <div className={classNames("bui-command-menu", className)} role="dialog" aria-label={label}><div className="bui-command-search"><SearchInput value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search commands" /></div><div className="bui-command-results">{groups.map((group, groupIndex) => <section key={groupIndex}><h3>{group.label}</h3>{group.items.map((item) => <button key={item.id} type="button" onClick={() => onSelect?.(item.id)}><span><strong>{item.label}</strong>{item.description ? <small>{item.description}</small> : null}</span>{item.shortcut ? <Kbd>{item.shortcut}</Kbd> : null}</button>)}</section>)}</div></div>;
}

export function DataToolbar({ search, filters, actions, className }: { search?: ReactNode; filters?: ReactNode; actions?: ReactNode; className?: string }) {
  return <div className={classNames("bui-data-toolbar", className)}><div className="bui-data-toolbar-primary">{search}{filters}</div>{actions ? <div className="bui-data-toolbar-actions">{actions}</div> : null}</div>;
}

export function Tag({ className, onRemove, removeLabel = "Remove", children, ...props }: HTMLAttributes<HTMLSpanElement> & { onRemove?: () => void; removeLabel?: string }) {
  return <span className={classNames("bui-tag", className)} {...props}>{children}{onRemove ? <button type="button" aria-label={removeLabel} onClick={onRemove}>×</button> : null}</span>;
}

export function NotificationBadge({ count, max = 99, label = "notifications", className }: { count: number; max?: number; label?: string; className?: string }) {
  const display = count > max ? `${max}+` : String(count);
  return <span className={classNames("bui-notification-badge", className)} aria-label={`${count} ${label}`}>{display}</span>;
}

export function Rating({ value, max = 5, label = "Rating", readOnly = true, onChange, className }: { value: number; max?: number; label?: string; readOnly?: boolean; onChange?: (value: number) => void; className?: string }) {
  return <div className={classNames("bui-rating", className)} role={readOnly ? "img" : "radiogroup"} aria-label={`${label}: ${value} of ${max}`}>{Array.from({ length: max }, (_, index) => { const ratingValue = index + 1; return readOnly ? <span key={ratingValue} className={ratingValue <= value ? "is-active" : undefined} aria-hidden="true">★</span> : <button key={ratingValue} type="button" role="radio" aria-label={`${ratingValue} of ${max}`} aria-checked={ratingValue === value} className={ratingValue <= value ? "is-active" : undefined} onClick={() => onChange?.(ratingValue)}>★</button>; })}</div>;
}

export function DateInput(props: InputProps) {
  return <Input type="date" {...props} />;
}

export function TimeInput(props: InputProps) {
  return <Input type="time" {...props} />;
}

export function ColorSwatch({ color, label, className }: { color: string; label: string; className?: string }) {
  return <span className={classNames("bui-color-swatch", className)}><span style={{ background: color }} aria-hidden="true" /><span>{label}<Code>{color}</Code></span></span>;
}

export function TokenPreview({ name, value, sample, className }: { name: string; value: string; sample?: ReactNode; className?: string }) {
  return <div className={classNames("bui-token-preview", className)}>{sample ? <div className="bui-token-sample">{sample}</div> : null}<div><Code>{name}</Code><span>{value}</span></div></div>;
}

export function useDisclosure(initialOpen = false) {
  const [open, setOpen] = useState(initialOpen);
  return {
    open,
    setOpen,
    openDisclosure: () => setOpen(true),
    closeDisclosure: () => setOpen(false),
    toggleDisclosure: () => setOpen((current) => !current),
  };
}

export function useControllableId(prefix = "bui") {
  const id = useId();
  return `${prefix}-${id.replace(/:/g, "")}`;
}
