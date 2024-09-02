import {
    Menu,
    Package2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Nav() {
    const pathname = window.location.pathname;

    return (
        <header className="max-w-[1400px] mx-auto sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <a href="/" className="flex items-center gap-2 text-lg font-semibold md:text-base">
                    <Package2 className="h-6 w-6" />
                    <span className="sr-only">home</span>
                </a>
                <a href="/" className={`transition-colors hover:text-foreground ${pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Home
                </a>
                <a href="/calculator" className={`transition-colors hover:text-foreground ${pathname === '/calculator' ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Calculadora
                </a>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <a href="/" className="flex items-center gap-2 text-lg font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="sr-only">home</span>
                        </a>
                        <a href="/" className="hover:text-foreground">
                            Home
                        </a>
                        <a href="/calculator" className="text-muted-foreground hover:text-foreground">
                            Calculadora
                        </a>
                    </nav>
                </SheetContent>
            </Sheet>
        </header>
    )
}