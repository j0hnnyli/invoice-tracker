"use client";

import { FormEvent, useState } from "react";
import CustomFormInput from "./CutomFormInput";
import DescriptionRow from "./DescriptionRow";
import HoverAction from "@/components/HoverAction";
import { CgSpinnerTwoAlt } from "react-icons/cg";
import { toast } from "sonner";
import FormDateSelectSection from "./FormDateSelectSection";
import FormInvoiceTotalSection from "./FormInvoiceTotalSection";
import { InvoiceType } from "@/lib/types/invoiceType";
import { FaArrowLeftLong } from "react-icons/fa6";
import FadeInContainer from "@/components/animation-components/AnimateFadeInContiner";
import Link from "next/link";
import PreviewButton from "@/components/pdf/PreviewButton";
import { links } from "@/lib/link";

type Row = {
  description: string;
  quantity: string;
  rate: string;
  amount: string;
};

type InvoiceFormProps = {
  initialFormValues?: InvoiceType | null;
  submitAction: (form: FormData) => Promise<{ error: string; success: string }>;
};

export default function InvoiceForm({
  initialFormValues,
  submitAction,
}: InvoiceFormProps) {
  //Controlled States
  const [invoiceNumber, setInvoiceNumber] = useState(initialFormValues?.invoice_number || "");
  const [name, setName] = useState(initialFormValues?.name || "");
  const [email, setEmail] = useState(initialFormValues?.email || "");
  const [address, setAddress] = useState(initialFormValues?.address || "");
  const [clientName, setClientName] = useState(initialFormValues?.client_name || "");
  const [clientEmail, setClientEmail] = useState(initialFormValues?.client_email || "");
  const [clientAddress, setClientAddress] = useState(initialFormValues?.client_address || "");
  const [note, setNote] = useState(initialFormValues?.note || "");
  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    initialFormValues?.created_at
      ? new Date(initialFormValues.created_at)
      : new Date()
  );
  const [selectedDueDate, setSelectedDueDate] = useState<Date | undefined>(() =>
    initialFormValues?.due_date
      ? new Date(initialFormValues.due_date)
      : undefined
  );

  const [discountValue, setDiscountValue] = useState(
    initialFormValues?.discount_value || ""
  );
  const [discountType, setDiscountType] = useState(
    initialFormValues?.discount_type || "%"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [rows, setRows] = useState<Row[]>(() => {
    const items = initialFormValues?.invoice_items;
    if (Array.isArray(items)) {
      return (items as Row[]).map((item) => ({
        description: item.description,
        quantity: item.quantity.toString(),
        rate: item.rate.toString(),
        amount: item.amount.toString(),
      }));
    }
    return [{ description: "", quantity: "0", rate: "0", amount: "0" }];
  });
  
  function handleRowChange(index: number, field: keyof Row, value: string) {
    setRows((prev) => {
      const updated = [...prev];
      const row = { ...updated[index], [field]: value };
      if (field === "quantity" || field === "rate") {
        const qty = parseFloat(row.quantity);
        const rt = parseFloat(row.rate);
        if (!isNaN(qty) && !isNaN(rt)) {
          row.amount = (qty * rt).toFixed(2);
        } else {
          row.amount = "";
        }
      }
      updated[index] = row;
      return updated;
    });
  }

  function addRow() {
    setRows((prev) => [
      ...prev,
      { description: "", quantity: "0", rate: "0", amount: "0" },
    ]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  const subtotal = rows
    .reduce((sum, row) => {
      const amount = parseFloat(row.amount);
      return sum + (isNaN(amount) ? 0 : amount);
    }, 0)
    .toFixed(2);

  const subtotalNumber = parseFloat(subtotal || "0");
  const discountNumber = parseFloat(discountValue || "0");

  const total =
    discountType === "$"
      ? subtotalNumber - discountNumber
      : subtotalNumber - (subtotalNumber * discountNumber) / 100;
      
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("created-at", selectedDate.toISOString());
    formData.append("due-date", selectedDueDate?.toISOString() || "");
    formData.append("discount_amount", discountValue);
    formData.append("discount_type", discountType);
    formData.append("subtotal", subtotal);
    formData.append("invoice_items", JSON.stringify(rows));

    if (initialFormValues?.id) {
      formData.append("invoice_id", String(initialFormValues.id));
    }

    setIsLoading(true);
    const result = await submitAction(formData);
    setIsLoading(false);

    if (result.error.length > 0) {
      setErrorMsg(result.error);
      return;
    }

    if (!initialFormValues) {
      setDiscountValue("");
      setDiscountType("$");
      setSelectedDate(new Date());
      setSelectedDueDate(undefined);
      setName("")
      setEmail("")
      setAddress("")
      setClientName("")
      setClientEmail("")
      setClientAddress("")
      setRows([{ description: "", quantity: "0", rate: "0", amount: "0" }]);
      toast.success("Invoice Sent", {
        description: "Invoice has been sent"
      });
    } else {
      toast.success("Sent Updated Invoice", {
        description : "Updated Invoice has been sent"
      });
    }

    setErrorMsg("");
  };


  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-between">
        <FadeInContainer direction="left" duration={0.4}>
          <label htmlFor="invoice-number" className="text-lg playfair">
            Invoice No. *
          </label>
          <div className="flex border w-fit rounded-lg">
            <span className="p-2 border-r bg-white/20">#</span>
            <input
              type="number"
              name="invoice-number"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
              className="p-1 outline-none"
              placeholder="5"
            />
          </div>
        </FadeInContainer>

        <FadeInContainer direction="left" duration={0.4} className="flex">
          <Link
            href={links.invoices}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/10"
          >
            <FaArrowLeftLong />
          </Link>
        </FadeInContainer>
      </div>

      <section className="flex flex-col md:flex-row gap-5 w-full lg:w-3/4 mt-5">
        <FadeInContainer direction="left" duration={0.4} className="w-full">
          <h2 className="playfair">From :</h2>
          <div className="flex flex-col gap-5">
            <CustomFormInput
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name *"
              name="name"
            />
            <CustomFormInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email *"
              name="email"
            />
            <CustomFormInput
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your Address"
              name="address"
            />
          </div>
        </FadeInContainer>

        <FadeInContainer direction="left" duration={0.4} className="w-full">
          <h2 className="playfair">To :</h2>
          <div className="flex flex-col gap-5">
            <CustomFormInput
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Name *"
              name="client-name"
            />
            <CustomFormInput
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Client Email *"
              name="client-email"
            />
            <CustomFormInput
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="Client Address"
              name="client-address"
            />
          </div>
        </FadeInContainer>
      </section>

      <FormDateSelectSection
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        selectedDueDate={selectedDueDate}
        setSelectedDueDate={setSelectedDueDate}
      />

      <section className="mt-5 w-full">
        <h2 className="text-4xl playfair">Invoice Items</h2>
        <div className="mt-5">
          {rows.map((row, index) => (
            <FadeInContainer
              key={index}
              duration={0.4}
              direction="left"
              delay={index * 0.2}
            >
              <DescriptionRow
                totalRows={rows.length}
                description={row.description}
                index={index}
                quantity={row.quantity}
                rate={row.rate}
                amount={row.amount}
                onChange={handleRowChange}
                onClick={() => removeRow(index)}
              />
            </FadeInContainer>
          ))}
        </div>
        <button
          type="button"
          onClick={addRow}
          className="py-2 px-4 bg-white/20 rounded-lg hover:bg-white/10 cursor-pointer"
        >
          Add Another Item
        </button>
      </section>

      <FormInvoiceTotalSection
        subtotal={subtotal}
        discountValue={discountValue}
        setDiscountValue={setDiscountValue}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        total={total}
        setDiscountType={setDiscountType}
      />

      <FadeInContainer
        direction="left"
        duration={0.4}
        className="flex gap-5 items-center mt-10"
      >
        <HoverAction type="submit" className="cursor-pointer">
          {initialFormValues ? "Send Updated Invoice" : "Send Invoice"}
        </HoverAction>

        {isLoading && <CgSpinnerTwoAlt className="animate-spin" />}
        {errorMsg && (
          <p className="text-red-500 playfair font-bold">{errorMsg}</p>
        )}
      </FadeInContainer>
      
      <PreviewButton
        data={{
          invoice_number: Number(invoiceNumber),
          client_name: clientName,
          client_email: clientEmail,
          client_address: clientAddress,
          name: name,
          email: email,
          address: address,
          created_at: selectedDate.toISOString(),
          due_date: selectedDueDate?.toISOString() || "",
          invoice_items: rows,
          discount_value: discountValue,
          discount_type: discountType,
          note: note,
          amount: total,
          sub_total: Number(subtotal),
        }}
      />

    </form>
  );
}
