import { PDFDownloadLink } from "@react-pdf/renderer";
import InvoicePreview from "./InvoicePreview";
import { InvoiceType } from "@/lib/types/invoiceType";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { InvoiceItem } from "@/lib/types/invoiceType";

type Props = {
  data: Omit<InvoiceType, "closed_at" | "id" | "status" | "user_id">;
};

export default function DownloadLink({ data }: Props) {
  const invoiceItems : InvoiceItem[] = 
  typeof data.invoice_items === "string" 
    ? JSON.parse(data.invoice_items) 
    : data.invoice_items;
  const subtotal = invoiceItems.reduce((sum, curr) => sum + curr.amount, 0).toFixed(2).toString();
  
  return (
    <PDFDownloadLink
      document={<InvoicePreview data={data} subtotal={subtotal} />}
      fileName={`invoice-${data.invoice_number}.pdf`}
      className="text-lg flex items-center gap-2 cursor-pointer w-full h-full"
    >
      <span>
        <IoCloudDownloadOutline />
      </span>
      <span>Download</span>
    </PDFDownloadLink>
  );
}
