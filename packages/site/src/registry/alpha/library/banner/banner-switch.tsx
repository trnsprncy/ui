import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface IBannerSwitchProps
  extends React.PropsWithChildren<{
    type: "category" | "tag";
    label: string;
    description: string;
    cookieName: string;
    isDisabled?: boolean;
    onCheckedChange: (checked: boolean) => void; // Function to update cookie state
    className?: string;
    isChecked: boolean;
  }> {}
/**
 * This component renders a custom switch component with a label and is responsible for handling the toggle interaction
 *
 * @export
 * @param {React.PropsWithChildren<IBannerSwitchProps>} {
 *    type: 'category' | 'tag'; label: string; description: string; cookieName: string; isDisabled?: boolean;
 *    onCheckedChange: (checked: boolean) => void; className?: string; isChecked: boolean;
 * }
 * @return {*}
 */
export function BannerSwitch({
  type,
  label,
  description,
  cookieName,
  isDisabled,
  onCheckedChange,
  className,
  isChecked,
}: IBannerSwitchProps) {
  const isCategory = type === "category";
  const { id } = {
    id: isCategory ? label.toLowerCase() : cookieName,
  };

  return (
    <div
      className={cn(
        "flex items-center space-y-1",
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
            !isCategory && "text-sm font-normal text-foreground/40"
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
