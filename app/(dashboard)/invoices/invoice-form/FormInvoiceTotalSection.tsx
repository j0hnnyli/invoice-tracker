import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CustomFormInput from "./CutomFormInput";
import FadeInContainer from "@/components/animation-components/AnimateFadeInContiner";

type FormInvoiceTotalSectionProps = {
  subtotal: string;
  setDiscountType: (type: string) => void;
  discountValue: string;
  setDiscountValue: (char: string) => void;
  total: number;
  noteDefaultValue ?: string;
};

export default function FormInvoiceTotalSection({
  subtotal,
  discountValue,
  total,
  noteDefaultValue,
  setDiscountType,
  setDiscountValue,
}: FormInvoiceTotalSectionProps) {
  return (
    <section
      className="mt-5 flex flex-col md:flex-row items-center justify-between"
    >
      <FadeInContainer 
        direction="left"
        duration={0.4}
        className="flex flex-col w-full md:w-1/2"
      >
        <label htmlFor="notes" className="playfair">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={2}
          defaultValue={noteDefaultValue}
          placeholder="notes . . ."
          className="outline-none"
        />
      </FadeInContainer>

      <FadeInContainer 
        direction="left"
        duration={0.4} 
        delay={0.2}
        className="w-full md:w-1/3 flex flex-col gap-5"
      >
        <div className="flex items-center justify-between w-full text-xl">
          <span className="playfair">Subtotal</span>
          <span>$ {subtotal}</span>
        </div>

        <div className="flex items-center justify-between w-full text-xl gap-5">
          <span className="playfair">Discount</span>

          <div className="flex items-center gap-2">
            <Select
              defaultValue="%"
              onValueChange={(val) => setDiscountType(val)}
            >
              <SelectTrigger className="text-white border-none">
                <SelectValue placeholder="%" />
              </SelectTrigger>

              <SelectContent className="bg-white/20 border-none backdrop-blur-3xl text-white">
                <SelectItem value="%" className="text-lg hover:bg-white/20">
                  %
                </SelectItem>
                <SelectItem value="$" className="text-lg hover:bg-white/20">
                  $
                </SelectItem>
              </SelectContent>
            </Select>
            <CustomFormInput
              type="number"
              placeholder="0"
              name="discount"
              className="border-none text-right"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-between w-full text-xl border-t">
          <span className="playfair"> Total</span>
          <span>$ {total.toString()} USD</span>
        </div>
      </FadeInContainer>
    </section>
  );
}
