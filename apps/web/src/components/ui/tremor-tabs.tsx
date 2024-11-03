// Tremor Tabs [v0.1.0]

import React from "react"
import * as TabsPrimitives from "@radix-ui/react-tabs"

import { cx, focusRing } from "@/lib/utils"

const Tabs = (
    props: Omit<
        React.ComponentPropsWithoutRef<typeof TabsPrimitives.Root>,
        "orientation"
    >,
) => {
    return <TabsPrimitives.Root tremor-id="tremor-raw" {...props} />
}

Tabs.displayName = "Tabs"

type TabsListVariant = "line" | "solid"

const TabsListVariantContext = React.createContext<TabsListVariant>("line")

interface TabsListProps
    extends React.ComponentPropsWithoutRef<typeof TabsPrimitives.List> {
    variant?: TabsListVariant
}

const variantStyles: Record<TabsListVariant, string> = {
    line: cx(
        // base
        "flex items-center justify-start border-b",
        // border color
        "border-stone-200 dark:border-stone-800",
    ),
    solid: cx(
        // base
        "inline-flex items-center justify-center rounded-md p-1",
        // background color
        // "bg-stone-100 dark:bg-stone-900",
        "bg-primary-foreground dark:bg-stone-900",
    ),
}

const TabsList = React.forwardRef<
    React.ElementRef<typeof TabsPrimitives.List>,
    TabsListProps
>(({ className, variant = "line", children, ...props }, forwardedRef) => (
    <TabsPrimitives.List
        ref={forwardedRef}
        className={cx(variantStyles[variant], className)}
        {...props}
    >
        <TabsListVariantContext.Provider value={variant}>
            {children}
        </TabsListVariantContext.Provider>
    </TabsPrimitives.List>
))

TabsList.displayName = "TabsList"

function getVariantStyles(tabVariant: TabsListVariant) {
    switch (tabVariant) {
        case "line":
            return cx(
                // base
                "-mb-px items-center justify-center whitespace-nowrap border-b-2 border-transparent px-3 pb-2 text-sm font-medium transition-all",
                // text color
                "text-stone-500 dark:text-stone-500",
                // hover
                "hover:text-stone-700 hover:dark:text-stone-400",
                // border hover
                "hover:border-stone-300 hover:dark:border-stone-400",
                // selected
                "data-[state=active]:border-stone-500 data-[state=active]:text-stone-500",
                "data-[state=active]:dark:border-stone-500 data-[state=active]:dark:text-stone-500",
                // disabled
                "data-[disabled]:pointer-events-none",
                "data-[disabled]:text-stone-300 data-[disabled]:dark:text-stone-700",
            )
        case "solid":
            return cx(
                // base
                "inline-flex items-center justify-center whitespace-nowrap rounded px-3 py-1 text-sm font-medium ring-1 ring-inset transition-all",
                // text color
                "text-stone-500 dark:text-stone-400",
                // hover
                "hover:text-stone-700 hover:dark:text-stone-200",
                // ring
                "ring-transparent",
                // selected
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow",
                "data-[state=active]:dark:bg-stone-950 data-[state=active]:dark:text-stone-50",
                // disabled
                "data-[disabled]:pointer-events-none data-[disabled]:text-stone-400 data-[disabled]:opacity-50 data-[disabled]:dark:text-stone-600",
            )
    }
}

const TabsTrigger = React.forwardRef<
    React.ElementRef<typeof TabsPrimitives.Trigger>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitives.Trigger>
>(({ className, children, ...props }, forwardedRef) => {
    const variant = React.useContext(TabsListVariantContext)
    return (
        <TabsPrimitives.Trigger
            ref={forwardedRef}
            className={cx(getVariantStyles(variant), focusRing, className)}
            {...props}
        >
            {children}
        </TabsPrimitives.Trigger>
    )
})

TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
    React.ElementRef<typeof TabsPrimitives.Content>,
    React.ComponentPropsWithoutRef<typeof TabsPrimitives.Content>
>(({ className, ...props }, forwardedRef) => (
    <TabsPrimitives.Content
        ref={forwardedRef}
        className={cx("outline-none", focusRing, className)}
        {...props}
    />
))

TabsContent.displayName = "TabsContent"

export { Tabs, TabsContent, TabsList, TabsTrigger }
