import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { GoogleLogo } from "./google-logo"
import { Link } from "./link"
import { Logo } from "./logo"
import { Button } from "./ui/button"
import { RememberMe } from "./remember-me"
import { Input } from "./ui/input"
import { TabsContent, TabsList, TabsTrigger } from "./ui/tremor-tabs"
import { Tabs } from "@radix-ui/react-tabs"

export function LoginForm() {
    return (
        <div className="h-screen flex align-middle ">
            <Card className={[
                "mx-auto max-w-md",
                "inline-block",
                "m-auto",
                "bg-stone-50",
            ].join(' ')}>
                <CardHeader>
                    <Logo />
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList variant="line" className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">Я шукаю житло</TabsTrigger>
                                <TabsTrigger value="password">Я пропоную житло</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                            </TabsContent>
                            <TabsContent value="password">
                            </TabsContent>
                        </Tabs>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="E-mail"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    Forgot your password?
                                </Link>
                            </div>
                            <Input id="password" type="password" required placeholder="Password" />
                        </div>
                        <Tabs defaultValue="account" className="w-[400px]">
                            <TabsList variant="solid" className="grid w-full grid-cols-2">
                                <TabsTrigger value="account">Власник житла</TabsTrigger>
                                <TabsTrigger value="password">Рієлтор</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                            </TabsContent>
                            <TabsContent value="password">
                            </TabsContent>
                        </Tabs>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            <GoogleLogo /> Login with Google
                        </Button>
                        <RememberMe />
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
