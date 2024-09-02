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
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { WindowType } from '@/components/containers/calculator';
import { Button } from "../ui/button";

interface FormAddProyectProps {
    items: WindowType[];
}

const ItemListContainer: React.FC<FormAddProyectProps> = ({ items }) => {
    console.log(items)
    return (
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Proyectos</CardTitle>
                    <CardDescription>
                        Ultimos proyectos
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-8/12">
                                Proyecto
                            </TableHead>
                            <TableHead className="w-1/12">
                                Status
                            </TableHead>
                            <TableHead className="w-2/12">
                                Date
                            </TableHead>
                            <TableHead className="w-1/12">
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((proyecto, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="font-medium">{proyecto.nombre}</div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="default"> active</Badge>
                                </TableCell>
                                <TableCell>
                                    2023-06-21
                                </TableCell>
                                <TableCell>
                                    <Button>
                                        <a href="/">Entrar</a>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ItemListContainer