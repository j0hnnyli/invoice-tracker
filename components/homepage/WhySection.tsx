import { whySectionInfo } from "@/lib/content/whySectionInfo";


export default function WhySection(){
  return (
    <section className="max_width mx-auto my-10 grid grid-cols-1 md:grid-cols-3 gap-5 px-5">
      {whySectionInfo.map(({icon : Icon, text}, i) => (
        <div key={i} className="text-white">
          <Icon className="text-4xl mx-auto"/>
          <div className="w-20 h-[1px] bg-[var(--primary-color)] rounded-xl mx-auto my-5"/>
          <p className="text-center">
            {text}      
          </p>
        </div>
      ))}
    </section>
  )
}