interface ConfirmModalProps {
    confirmAction: { id: string | number, type: 'booking' | 'order' } | null;
    showModalAnim: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmModal = ({ confirmAction, showModalAnim, onClose, onConfirm }: ConfirmModalProps) => {
    if (!confirmAction) return null;
    
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div 
                className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ease-out ${showModalAnim ? "opacity-100" : "opacity-0"}`}
                onClick={onClose} 
            />
            <div className={`relative bg-[#0a0a0a] border border-white/10 p-10 w-full max-w-sm text-center shadow-2xl transition-all duration-500 ease-out transform ${showModalAnim ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4"}`}>
                <h3 className="text-2xl font-serif mb-4 italic text-white">Are you sure?</h3>
                <p className="text-white/40 text-sm mb-8 font-light leading-relaxed">
                    {confirmAction.type === 'booking' ? "Do you really want to cancel this reservation?" : "Mark this order as received?"}
                </p>
                <div className="flex flex-col gap-3">
                    <button onClick={onConfirm} className="w-full py-4 bg-red-600 text-[11px] font-bold uppercase tracking-widest hover:bg-red-700 transition active:scale-95">
                        Yes, confirm
                    </button>

                    <button onClick={onClose} className="w-full py-4 border border-white/10 text-[11px] font-bold uppercase tracking-widest hover:bg-white/5 transition active:scale-95">
                        No, go back
                    </button>
                </div>
            </div>
        </div>
    );
};