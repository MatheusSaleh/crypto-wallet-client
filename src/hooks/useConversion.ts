import { useRef, useState } from "react";
import { convertAsset } from "../services/conversionService";
import toast from "react-hot-toast";

export function useConversion() {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<number | null>(null)
    const [rate, setRate] = useState<number | null>(null)

    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function clearResult() {
        setResult(null)
        setRate(null)
    }

    async function convert(from: string, to: string, amount: number) {

        if(debounceRef.current){
            clearTimeout(debounceRef.current)
        }

        debounceRef.current = setTimeout(async () => {

            try {

                setLoading(true)

                const data = await convertAsset(from, to, amount)

                setRate(data.rate)
                setResult(data.result)

                toast.success("Conversão realizada com sucesso!")
            } catch (error) {
                toast.error(error instanceof Error ? error.message : "Erro ao converter moeda")
            } finally {
                setLoading(false)
            }
        }, 600)
    }

    return {
        convert, 
        loading, 
        result, 
        rate,
        clearResult
    }
}