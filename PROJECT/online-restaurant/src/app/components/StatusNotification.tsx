interface StatusNotificationProps {
    status: string | null;
}

export const StatusNotification = ({ status }: StatusNotificationProps) => (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[150] transition-all duration-500 ${status ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-12"}`}>
        <div className="bg-white text-black px-10 py-4 border-l-8 border-red-500 font-bold text-[13px] shadow-2xl">
            {status}
        </div>
    </div>
);