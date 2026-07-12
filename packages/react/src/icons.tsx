import { ArrowRightIcon } from "@phosphor-icons/react/dist/csr/ArrowRight";
import { ArrowSquareOutIcon } from "@phosphor-icons/react/dist/csr/ArrowSquareOut";
import { ArrowsClockwiseIcon } from "@phosphor-icons/react/dist/csr/ArrowsClockwise";
import { CaretDownIcon } from "@phosphor-icons/react/dist/csr/CaretDown";
import { CaretLeftIcon } from "@phosphor-icons/react/dist/csr/CaretLeft";
import { CaretRightIcon } from "@phosphor-icons/react/dist/csr/CaretRight";
import { CaretUpIcon } from "@phosphor-icons/react/dist/csr/CaretUp";
import { ChartBarIcon } from "@phosphor-icons/react/dist/csr/ChartBar";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/csr/CheckCircle";
import { CheckIcon } from "@phosphor-icons/react/dist/csr/Check";
import { CloudIcon } from "@phosphor-icons/react/dist/csr/Cloud";
import { CopyIcon } from "@phosphor-icons/react/dist/csr/Copy";
import { CubeIcon } from "@phosphor-icons/react/dist/csr/Cube";
import { DatabaseIcon } from "@phosphor-icons/react/dist/csr/Database";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/csr/DownloadSimple";
import { EyeIcon } from "@phosphor-icons/react/dist/csr/Eye";
import { EyeSlashIcon } from "@phosphor-icons/react/dist/csr/EyeSlash";
import { FileIcon } from "@phosphor-icons/react/dist/csr/File";
import { GearSixIcon } from "@phosphor-icons/react/dist/csr/GearSix";
import { HardDrivesIcon } from "@phosphor-icons/react/dist/csr/HardDrives";
import { InfoIcon } from "@phosphor-icons/react/dist/csr/Info";
import { ListIcon } from "@phosphor-icons/react/dist/csr/List";
import { LockSimpleIcon } from "@phosphor-icons/react/dist/csr/LockSimple";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/csr/MagnifyingGlass";
import { MinusIcon } from "@phosphor-icons/react/dist/csr/Minus";
import { MoonIcon } from "@phosphor-icons/react/dist/csr/Moon";
import { PlusIcon } from "@phosphor-icons/react/dist/csr/Plus";
import { SquaresFourIcon } from "@phosphor-icons/react/dist/csr/SquaresFour";
import { StarIcon } from "@phosphor-icons/react/dist/csr/Star";
import { SunIcon } from "@phosphor-icons/react/dist/csr/Sun";
import { TerminalWindowIcon } from "@phosphor-icons/react/dist/csr/TerminalWindow";
import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";
import { UploadSimpleIcon } from "@phosphor-icons/react/dist/csr/UploadSimple";
import { UserIcon } from "@phosphor-icons/react/dist/csr/User";
import { WarningIcon } from "@phosphor-icons/react/dist/csr/Warning";
import { XIcon } from "@phosphor-icons/react/dist/csr/X";
import { IconContext as PhosphorIconContext } from "@phosphor-icons/react/dist/lib/context";
import type {
  Icon as PhosphorIconComponent,
  IconProps as NativePhosphorIconProps,
  IconWeight,
} from "@phosphor-icons/react/dist/lib/types";

export const iconNames = [
  "arrowRight",
  "box",
  "chart",
  "check",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "close",
  "cloud",
  "copy",
  "dashboard",
  "database",
  "download",
  "externalLink",
  "eye",
  "eyeOff",
  "file",
  "info",
  "lock",
  "menu",
  "minus",
  "moon",
  "plus",
  "refresh",
  "search",
  "server",
  "settings",
  "star",
  "success",
  "sun",
  "terminal",
  "trash",
  "upload",
  "user",
  "warning",
] as const;

export type IconName = (typeof iconNames)[number];
export type BaseUIIconComponent = PhosphorIconComponent;
export type BaseUIIconWeight = IconWeight;
export type BaseUIPhosphorIconProps = NativePhosphorIconProps;

export const iconRegistry = {
  arrowRight: ArrowRightIcon,
  box: CubeIcon,
  chart: ChartBarIcon,
  check: CheckIcon,
  chevronDown: CaretDownIcon,
  chevronLeft: CaretLeftIcon,
  chevronRight: CaretRightIcon,
  chevronUp: CaretUpIcon,
  close: XIcon,
  cloud: CloudIcon,
  copy: CopyIcon,
  dashboard: SquaresFourIcon,
  database: DatabaseIcon,
  download: DownloadSimpleIcon,
  externalLink: ArrowSquareOutIcon,
  eye: EyeIcon,
  eyeOff: EyeSlashIcon,
  file: FileIcon,
  info: InfoIcon,
  lock: LockSimpleIcon,
  menu: ListIcon,
  minus: MinusIcon,
  moon: MoonIcon,
  plus: PlusIcon,
  refresh: ArrowsClockwiseIcon,
  search: MagnifyingGlassIcon,
  server: HardDrivesIcon,
  settings: GearSixIcon,
  star: StarIcon,
  success: CheckCircleIcon,
  sun: SunIcon,
  terminal: TerminalWindowIcon,
  trash: TrashIcon,
  upload: UploadSimpleIcon,
  user: UserIcon,
  warning: WarningIcon,
} satisfies Record<IconName, PhosphorIconComponent>;

export interface IconProps extends Omit<NativePhosphorIconProps, "alt" | "children"> {
  name: IconName;
  label?: string;
}

export interface PhosphorIconProps extends Omit<NativePhosphorIconProps, "alt" | "children"> {
  icon: PhosphorIconComponent;
  label?: string;
}

function accessibilityProps(label?: string) {
  if (label) {
    return {
      alt: label,
      role: "img" as const,
      "aria-label": label,
    };
  }

  return {
    "aria-hidden": true,
    focusable: false,
  };
}

export function PhosphorIcon({
  icon: IconComponent,
  label,
  size = 20,
  weight = "regular",
  className = "",
  ...props
}: PhosphorIconProps) {
  return (
    <IconComponent
      size={size}
      weight={weight}
      className={`bui-icon ${className}`.trim()}
      {...accessibilityProps(label)}
      {...props}
    />
  );
}

export function Icon({ name, ...props }: IconProps) {
  return <PhosphorIcon icon={iconRegistry[name]} {...props} />;
}

export {
  ArrowRightIcon,
  ArrowSquareOutIcon,
  ArrowsClockwiseIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CaretUpIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CheckIcon,
  CloudIcon,
  CopyIcon,
  CubeIcon,
  DatabaseIcon,
  DownloadSimpleIcon,
  EyeIcon,
  EyeSlashIcon,
  FileIcon,
  GearSixIcon,
  HardDrivesIcon,
  InfoIcon,
  ListIcon,
  LockSimpleIcon,
  MagnifyingGlassIcon,
  MinusIcon,
  MoonIcon,
  PhosphorIconContext,
  PlusIcon,
  SquaresFourIcon,
  StarIcon,
  SunIcon,
  TerminalWindowIcon,
  TrashIcon,
  UploadSimpleIcon,
  UserIcon,
  WarningIcon,
  XIcon,
};
