import useGoBack from "../../hooks/useGoBack";
export default function UserDashboard() {
    const goBack = useGoBack();

    return (
        <main className="min-h-screen flex items-center justify-center bg-pink-50">
            <div>This is user dashboard</div>
            <div>
                <button onClick={goBack} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Go Back
                </button>
            </div>
        </main>
    );
}