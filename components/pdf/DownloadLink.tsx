import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "./Invoice";
import { InvoiceType } from "@/lib/types/invoiceType";
import { IoCloudDownloadOutline } from "react-icons/io5";

type Props = {
  data: Omit<InvoiceType, "closed_at" | "id" | "status" | "user_id">;
};

export default function DownloadLink({ data }: Props) {
  return (
    <PDFDownloadLink
      document={<Invoice data={data} />}
      fileName={`invoice-${data.invoice_number}.pdf`}
      className="flex items-center gap-2 cursor-pointer w-full h-full"
    >
      <span>
        <IoCloudDownloadOutline />
      </span>
      <span>Download</span>
    </PDFDownloadLink>
  );
}
