"use client";

import { InvoiceType } from "@/lib/types/invoiceType";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import PDFViewerComponent from "./PDFViewerComponent";

type PreviewButtonProps = {
  data: Omit<InvoiceType, "id" | "user_id" | "status" | "closed_at">;
};

export default function PreviewButton({ data }: PreviewButtonProps) {

  return (
    <Drawer>
      <DrawerTrigger
        className="p-2 rounded-lg bg-white/20 hover:bg-white/10 backdrop-blur-3xl fixed bottom-28 md:bottom-10 right-10"
      >
        Preview
      </DrawerTrigger>
      <DrawerContent className="bg-gradient-to-br from-[var(--primary-color)] via-[var(--secondary-color)] to-[var(--third-color)] text-white border-none">
        <DrawerHeader>
          <DrawerTitle className="playfair text-3xl">Invoice Preview</DrawerTitle>
          <DrawerDescription className="text-gray-300">Make sure your invoice in perfect before sending</DrawerDescription>
        </DrawerHeader>
        <PDFViewerComponent data={data}/>
      </DrawerContent>
    </Drawer>
  );
}
