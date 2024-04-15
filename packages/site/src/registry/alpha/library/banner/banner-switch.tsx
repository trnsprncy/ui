import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface ICookieSwitchProps {
  type: "category" | "tag";
  label: string;
  description: string;
  cookieName: string;
  isDisabled?: boolean;
  onCheckedChange: (checked: boolean) => void; // Function to update cookie state
  className?: string;
  isChecked: boolean;
}

export function CookieSwitch({
  type,
  label,
  description,
  cookieName,
  isDisabled,
  onCheckedChange,
  className,
  isChecked,
}: React.PropsWithChildren<ICookieSwitchProps>) {
  const isCategory = type === "category";
  const { id } = {
    id: isCategory ? label.toLowerCase() : cookieName,
  };

  return (
    <div
      className={cn(
        "flex items-center space-y-6",
        !isCategory && "text-sm",
        isDisabled && "hover:opacity-80 hover:cursor-not-allowed",
        className
      )}
    >
      <Switch
        id={id}
        disabled={isDisabled}
        checked={isChecked}
        onCheckedChange={onCheckedChange}
        className={cn(
          "data-[state=checked]:bg-gray-700 data-[state=unchecked]:bg-gray-500",
          !isCategory && "scale-75"
        )}
        thumb={{
          className:
            "data-[state=checked]:bg-gray-300 data-[state=unchecked]:bg-gray-400",
        }}
      />
      <div className="w-full ml-6">
        <label
          htmlFor={id}
          className={cn(
            "text-lg font-medium",
            !isCategory && "text-base font-normal text-white/50"
          )}
        >
          {label}
        </label>
        <p className={cn("text-gray-500 text-sm", !isCategory && "text-xs")}>
          {description}
        </p>
      </div>
    </div>
  );
}