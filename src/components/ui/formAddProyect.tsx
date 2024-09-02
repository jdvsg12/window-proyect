import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form"
import { WindowType } from '@/components/containers/calculator';
import useLocalStorage from "@/hooks/useLocalStorage"

const formSchema = zod.object({
    nombre: zod.string().max(100, {
        message: "No puedes nombrar este espacio con mas de 100 caracteres"
    })
})

interface FormAddProyectProps {
    data: WindowType[];
}

const FormAddProyect: React.FC<FormAddProyectProps> = ({ data }) => {
    const [items, setItems] = useLocalStorage('items', []);


    const form = useForm<zod.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nombre: "",
        },
    });

    const handleSubmit = (values: zod.infer<typeof formSchema>) => {
        const combinedValues = { ...values, ...data };
        setItems([...items, combinedValues]);

        // Reiniciamos el formulario
        form.reset();
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>cargar proyecto</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Agrega el nombre del proyecto</DialogTitle>
                    <DialogDescription>
                        acá puedes agrega el nombre del proyecto
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="max-w-[1400px] w-full flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="nombre"
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>Nombre del espacio</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nombre del espacio"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <DialogClose asChild>
                            <Button type="submit" className="w-full">
                                Crear
                            </Button>
                        </DialogClose>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

export default FormAddProyect


