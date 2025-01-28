import { Button, Card, Input, Modal, ModalContent } from "@heroui/react"
import { X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface AddLikesModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (count: number) => void
}

const AddLikesModal = ({ isOpen, onClose, onSubmit }: AddLikesModalProps) => {
    const [likesCount, setLikesCount] = useState<string>("")

    const handleSubmit = () => {
        const count = parseInt(likesCount)
        if (isNaN(count) || count < 1) {
            toast.error("Введите корректное количество лайков")
            return
        }
        
        onSubmit(count)
        setLikesCount("")
    }

    return (
        <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            className="max-w-sm mx-4"
        >
            <ModalContent>
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-lg font-medium text-neutral-900">Добавить лайки</p>
                        <button 
                            onClick={onClose}
                            className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                            <X size={20} className="text-neutral-500" />
                        </button>
                    </div>
                    <Input
                        type="number"
                        label="Количество лайков"
                        value={likesCount}
                        onChange={(e) => setLikesCount(e.target.value)}
                        min={1}
                        className="mb-4"
                    />
                    <Button
                        onPress={handleSubmit}
                        className="w-full text-white bg-safetyOrange"
                    >
                        Добавить
                    </Button>
                </Card>
            </ModalContent>
        </Modal>
    )
}

export default AddLikesModal 