import microsoft from "../../assets/microsoft.svg";

export default function MicrosoftButton() {
    return (
        <button
            type="button" //type="button" prevents from submitting the form without login
            className="w-full flex items-center justify-center hover:bg-blue-700 hover:text-white
                px-4 py-2 border rounded-lg shadow-xl font-medium disabled:bg-gray-400
                disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
        >
            <img
                src={microsoft}
                alt="Microsoft logo"
                className="w-5 h-5"
            />
            <span className="ml-4">Continue with Microsoft</span>
        </button>
    );
}