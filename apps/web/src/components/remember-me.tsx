import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";


export function RememberMe({ ...props }: CheckboxProps) {
    return (
        <div className="flex items-center space-x-2">
            <Checkbox {...props} id="remember-me" />
            <Label htmlFor="remember-me">Remember Me</Label>
        </div>
    )
}
