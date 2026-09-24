import { useState } from 'react';
import { Link } from 'react-router-dom'

type LoginForm = {
    username: string;
};
export default function ForgotPassword() {
    const [form, setForm] = useState<LoginForm>({
        username: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="w-full max-w-md p-6 bg-pink-100 border border-gray-300 rounded-lg shadow-lg space-y-5">
                <h1 className="text-2xl font-bold text-center">
                    Reset your password
                </h1>
                <div>
                    <label>Email Address*:</label>
                    <input
                        type="email"
                        name="username"// Allows e.target.name return "username", so handleChange knows which state property to update.
                        placeholder="Enter your email address"
                        value={form.username}// Displays the current value of form.username in the input field
                        onChange={handleChange}
                        className="w-full rounded-md border border-black-300 px-2 py-2 pr-10"
                    />
                </div>
                <div className="space-y-2">
                    <button
                        type="reset"
                        className="w-full text-center rounded-md border bg-blue-400 text-white p-1"
                    >
                        Reset
                    </button>
                    <Link
                        to="/login"
                        className="w-full text-center rounded-md border bg-blue-400 text-white p-1"
                    >
                        Login
                    </Link>
                </div>
            </form>
        </div>
    )
}