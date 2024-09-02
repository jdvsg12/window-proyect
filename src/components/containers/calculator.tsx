import { useForm } from "react-hook-form"
import * as zod from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import FormAddProyect from "../ui/formAddProyect"



const formSchema = zod.object({
  nombre: zod.string().max(100, {
    message: "No puedes nombrar este espacio con mas de 100 caracteres"
  }),
  alto: zod.coerce.number().min(3, {
    message: "El minimo de numeros es de 3"
  }),
  ancho: zod.coerce.number().min(3, {
    message: "El minimo de numeros es de 3"
  }),
})

interface ExplodedWindowType {
  cabezal: number;
  sillar: number;
  jambaDerecha: number;
  jambaIzquierda: number;
  engancheHoja1: number;
  engancheHoja2: number;
  traslape1: number;
  traslape2: number;
  socaloSuperior1: number;
  socaloSuperior2: number;
  socaloInferior1: number;
  socaloInferior2: number;
}
export type WindowType = zod.infer<typeof formSchema> & ExplodedWindowType;

function Calculator() {
  const [window, setWindow] = useState<WindowType[]>([]);

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      alto: 0,
      ancho: 0,
    },
  });

  const handleSubmit = (values: zod.infer<typeof formSchema>) => {

    const explodedWindow: ExplodedWindowType = {
      cabezal: values.ancho,
      sillar: values.ancho,
      jambaDerecha: values.alto - 11,
      jambaIzquierda: values.alto - 11,
      engancheHoja1: values.alto - 25,
      engancheHoja2: values.alto - 25,
      traslape1: values.alto - 25,
      traslape2: values.alto - 25,
      socaloSuperior1: values.ancho / 2,
      socaloSuperior2: values.ancho / 2,
      socaloInferior1: values.ancho / 2,
      socaloInferior2: values.ancho / 2,
    };

    // Unificamos `values` y `explodedWindow` en un solo objeto
    const combinedValues = { ...values, ...explodedWindow };

    setWindow((prev) => [...prev, combinedValues]);
    // Reiniciamos el formulario
    form.reset();
  };

  return (
    <main className="flex gap-2 flex-col md:p-8" >
      <Card>
        <CardHeader>
          <CardTitle>Carga las medidas</CardTitle>
          <CardDescription>Agrega las medidas de la ventana</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="max-w-[1400px] w-full flex flex-col gap-4"
            >
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
              <div className="w-full flex flex-row gap-6">
                <FormField
                  control={form.control}
                  name="ancho"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col w-6/12">
                        <FormLabel>Ancho</FormLabel>
                        <FormControl>
                          <Input placeholder="Ancho en milimetros" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="alto"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col w-6/12">
                        <FormLabel>Alto</FormLabel>
                        <FormControl>
                          <Input placeholder="Alto en milimetros" type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <Button disabled={!form.formState.isValid} type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Ventanas</CardTitle>
            <CardDescription>
              Ventanas cargadas recientemente
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-6/12">Espacio</TableHead>
                <TableHead className="w-3/12 text-center">Ancho</TableHead>
                <TableHead className="w-3/12 text-center">Alto</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          {window.map(({ nombre, alto, ancho, cabezal, sillar, jambaDerecha, engancheHoja1, traslape1, socaloSuperior1, socaloInferior1 }, index) => (
            <Accordion key={`${index}-${ancho}`} type="single" collapsible className="w-full hover:no-underline">
              <AccordionItem value={`${index}-${ancho}`}>
                <AccordionTrigger>
                  <Table className="hover:no-underline">
                    <TableBody>
                      <TableRow>
                        <TableCell className="w-6/12">
                          <div className="font-medium text-left">{nombre}</div>
                        </TableCell>
                        <TableCell className="w-3/12">
                          <div className="font-medium text-center">{ancho}mm</div>
                        </TableCell>
                        <TableCell className="w-3/12">
                          <div className="font-medium text-center">{alto}mm</div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionTrigger>
                <AccordionContent>
                  <Table className="hover:no-underline">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-center">Cabezal</TableHead>
                        <TableHead className="text-center">Sillar</TableHead>
                        <TableHead className="text-center">Jamba x 2</TableHead>
                        <TableHead className="text-center">Socalo superior x 2</TableHead>
                        <TableHead className="text-center">Socalo inferior x 2</TableHead>
                        <TableHead className="text-center">Enganche x 2</TableHead>
                        <TableHead className="text-center">traslape x 2</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <div className="font-medium text-center">{cabezal}mm</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-center">{sillar}mm</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-center">{jambaDerecha}mm</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-center">{socaloSuperior1}mm</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-center">{socaloInferior1}mm</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-center">{engancheHoja1}mm</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium text-center">{traslape1}mm</div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </CardContent>
        <CardFooter className="justify-end">
          <FormAddProyect data={window} />
        </CardFooter>
      </Card>
    </main >
  )
}

export default Calculator