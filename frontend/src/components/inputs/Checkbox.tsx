type CheckboxProps = {
    name: string;
    checked: boolean;//form = property and variable, SignupFormData = type, form used because components needs acceptTerms value
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export default function Checkbox({
    name,
    checked,
    onChange,
}: CheckboxProps) {
    return (
        <div>
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
            />
        </div>
    );
}
