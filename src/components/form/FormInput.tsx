interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string
}

export default function FormInput({label, error, className, ...props}: FormInputProps){
    return(
        <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">{label}</label>
            <input {...props} className={`block w-full rounded-md border border-white/10 bg-slate-900 p-2 outline-none focus:border-lime-400 ${className}`} />
            {error && (
                <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
        </div>
    )
}