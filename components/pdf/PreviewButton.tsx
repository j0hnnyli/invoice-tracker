import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { PDFViewer } from "@react-pdf/renderer"
import InvoicePreview from "./InvoicePreview"
import { InvoiceType } from "@/lib/types/invoiceType";

type PreviewButtonProps = {
  text : string;
  data: Omit<InvoiceType, "closed_at" | "id" | "status" | "user_id"> & {subtotal : string};
}

export default function PreviewButton({text, data} : PreviewButtonProps){

  return (
    <Sheet>
      <SheetTrigger className="p-2 rounded-lg bg-white/20 hover:bg-white/10 fixed  bottom-28 md:bottom-10 right-10">
        {text}
      </SheetTrigger>
      <SheetContent className="bg-slate-800 text-white border-none  border border-white">
          <SheetHeader>
          <SheetTitle>Invoice Preview</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <PDFViewer
          showToolbar={false}
          style={{
            width: "100%",
            height: "540px",
            border: "none",
          }}
        >   
          <InvoicePreview
            data={data}
          />
        </PDFViewer>
      </SheetContent>
    </Sheet>
  )
}