import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { FaCalendar } from "react-icons/fa";

type FormDateSelectProps = {
  selectedDate : Date;
  setSelectedDate : (date : Date) => void;
  selectedDueDate : Date | undefined;
  setSelectedDueDate : (date : Date | undefined) => void;
}

export default function FormDateSelectSection( {selectedDate, setSelectedDate, selectedDueDate, setSelectedDueDate} : FormDateSelectProps){
  return (
            <section className="mt-5 flex flex-col md:flex-row gap-5 lg:w-3/4">
          <div className="flex flex-col w-full">
            <label className="playfair">Date :</label>
            <Popover>
              <PopoverTrigger className="flex items-center border rounded-lg">
                <span className="p-2 border-r bg-white/20">
                  <FaCalendar />
                </span>
                <span className="p-1">
                  {selectedDate
                    ? new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDate)
                    : "Select a Date"}
                </span>
              </PopoverTrigger>
              <PopoverContent className="bg-white/20 backdrop-blur-3xl border-white">
                <Calendar
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date || new Date())}
                  captionLayout="dropdown"
                  mode="single"
                  hidden={{ before: new Date() }}
                  className="text-white w-full"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="flex flex-col w-full">
            <label className="playfair">Due Date : *</label>
            <Popover>
              <PopoverTrigger className="flex items-center border rounded-lg">
                <span className="p-2 border-r bg-white/20">
                  <FaCalendar />
                </span>
                <span className="p-1">
                  {selectedDueDate
                    ? new Intl.DateTimeFormat("en-US", {
                        dateStyle: "long",
                      }).format(selectedDueDate)
                    : "Select a Date"}
                </span>
              </PopoverTrigger>
              <PopoverContent className="bg-white/20 backdrop-blur-3xl border-white">
                <Calendar
                  selected={selectedDueDate}
                  onSelect={(date) => setSelectedDueDate(date)}
                  captionLayout="dropdown"
                  mode="single"
                  hidden={{ before: new Date() }}
                  className="text-white w-full"
                />
              </PopoverContent>
            </Popover>
          </div>
        </section>
  )
}