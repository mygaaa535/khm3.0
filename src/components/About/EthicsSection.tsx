"use client";

import React from "react";
import {
  Users,
  ShieldCheck,
  MessageSquare,
  FileText,
  Briefcase,
  Landmark,
  Gift,
  Ban,
  Leaf,
} from "lucide-react";
import { AboutCard } from "./AboutCard";
import { useLanguage } from "@/context/LanguageContext";

const mnEthicsData = [
  {
    icon: Users,
    title: "Нийгмийн хариуцлага",
    description:
      "Бидний зорилго бол нийгэм, эдийн засгийн хогжлийг дэмжих тогтвортой, урт хугацааны боломжуудыг нийгэмдээ бий болгох явдал юм.\nҮйл ажиллагаа явуулж буй орчин, нийгмийнхээ өмнө хариуцлагатай байж, хамтран ажиллахыг бид эрхэмлэж байна. Үүний тулд Байгаль орчин, нийгэм, засаглалын бүтцийг тодорхойлон ажиллаж байна.",
  },
  {
    icon: Users,
    title: "Тэгш боломж , оролцоо",
    description:
      "Бид бүх ажилчдад тэгш боломж олгож, тэдний оролцоог хангахыг эрмэлздэг. Нас, хүйс, гэр бүл, гэрлэлтийн байдал, арьсны өнгө, жирэмслэлт, хөгжлийн бэрхшээл, шашин шүтлэг, итгэл үнэмшил, бэлгийн чиг баримжаагаар ялгаварлан гадуурхахгүй эрх чөлөөт, тэгш боломжит орчныг бүрдүүлэхийг зорьж байна.",
  },
  {
    icon: Users,
    title: "Шударга өрсөлдөөн",
    description:
      "Бид шударга өрсөлдөөнийг эрхэмлэдэг бөгөөд компанийн бизнест хохирол учруулахуйц бүх төрлийн шударга бус үйл ажиллагааг хориглодог. Компанийн ажилтнууд үйлчлүүлэгчид, ханган нийлүүлэгчид болон өрсөлдөгчдөд компанийн дотоод нууц мэдээллийг өгөх эсхүл өрсөлдөгчдөөс нууц мэдээлэл эрж хайх, хүлээн авах, хэлэлцэхийг хориглоно. Бид Өрсөлдөөний тухай хуулийг баримтлан ажилладаг.",
  },
  {
    icon: ShieldCheck,
    title: "Хүний эрхийн төлөөх амлалт",
    description:
      "Бид, манай компанийн ажилчид болон хамтран ажиллагсдын эрх, нэр төрийг хүндэтгэдэг. Хүүхдийн хөдөлмөр.Тиймээс ч бид компанийн дотоод үйл ажиллагаа болон хамтран ажиллагсдын хүрээнд ямар нэгэн хүний эрхийн асуудал зөрчигдөж байна гэж үзвэл хуулийн хүрээнд цаг алдалгүй шийдвэрлэж ажилладаг.",
  },
  {
    icon: MessageSquare,
    title: "Үг хэлэх эрх чөлөө",
    description:
      "Бизнесийн үйл ажиллагааны аль ч түвшинд аливаа зохисгүй үйлдлийн талаар санаа зоволтгүй мэдээлэх боломжийг өөрийн ажилчдадаа бид олгодог. Энэ хүрээнд хөндөгдсөн бүхий л асуудлыг хүлээн авч, зохих ёсоор шийдвэрлэнэ. Аливаа асуудлын талаарх мэдээллийг дээд түвшний албан тушаалтан менежерт дамжуулан мэдээлэх үүрэгтэй. Хэрэв боломжгүй гэж үзвэл компанийн “нууцын зэрэглэлтэй тайлан”-д оруулан мэдээлнэ.",
  },
  {
    icon: FileText,
    title: "Хуульд нийцсэн байдал",
    description:
      "Бид Монгол Улсын холбогдох хууль тогтоомжийн хүрээнд ажиллаж, бизнесийн бүхий л харилцаандаа хууль дээдлэх ёсыг баримталдаг. Аливаа хууль тогтоомж, стандарт, бодлогыг дагаж мөрдөөгүй бол сахилгын шийтгэл ногдуулах журмыг хэрэгжүүлдэг.",
  },
  {
    icon: Briefcase,
    title: "Ашиг сонирхлын зөрчил",
    children: (
      <div className="text-gray-600 text-sm leading-relaxed space-y-2">
        <p>
          Аливаа хүний хувийн ашиг сонирхол түүний бодитой шийдвер гаргах
          чадварт нь нөлөөлснөөр ашиг сонирхлын зөрчил үүсдэг. Тухайлбал:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Өрсөлдөгч, үйлчлүүлэгч, нийлүүлэгчидтэй бизнесийн үйл ажиллагаанаас
            өөр харилцаа холбоотой байх;
          </li>
          <li>
            Гэр бүл, ойрын хамаатан садантай хамт ажиллах, ялангуяа төрийн алба
            хаагч;
          </li>
          <li>
            Өөр байгууллагын ТУЗ-ийн гишүүнээр ажиллах зэрэг нь ашиг сонирхлын
            зөрчил үүсэж болох арга зам юм.
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: Landmark,
    title: "Улс төрийн үйл ажиллагаа, хандив",
    children: (
      <div className="text-gray-600 text-sm leading-relaxed space-y-2">
        <p>
          Хувь хүнийхээ хувьд хэн ч улс төрийн үйл ажиллагаанд оролцож, хандив
          өгөх эрхтэй. Харин ингэхдээ эл үйлдлээ компанийн бус хувийн улс төрийн
          үзэл баримтлал, үйл ажиллагаа гэдгээ тодорхой байлгах хэрэгтэй юм.
          Үүнд:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Улс төрийн аливаа нэр дэвшигч, намыг дэмжихдээ компанийн төсөв,
            нөөцийг ашиглахгүй байх;
          </li>
          <li>
            Лоббитой холбоотой ямар нэгэн үйл ажиллагаа явуулахын тулд зөвшөөрөл
            авах.
          </li>
        </ul>
      </div>
    ),
  },
  {
    icon: Gift,
    title: "Бэлэг, урамшуулал",
    description:
      "Бизнесийн харилцааны энгийн нэг хэсэг болох аливаа бэлэг, урамшууллыг зохистой хэмжээнд хүлээн авах, өгөх явдлыг бид дэмждэг. Харин зохисгүй хэмжээнд буюу хэт их /том бэлэг, урамшуулал хүлээн авах, өгөхийг хориглодог. Бэлэг, урамшууллаар дамжуулан ямар нэгэн нөлөөнд автах болон нөлөөлөхөөр завдахгүй байх ёстой. Мөн бид тендер шалгаруулалтын үеэр ямар нэгэн бэлэг урамшуулал өгөх ба хүлээн авахыг зөвшөөрдөггүй дүрэмтэй.",
  },
  {
    icon: Ban,
    title: "Авлига, хээл хахууль",
    description:
      "Бид хээл хахууль, авлигыг үл тэвчих байр суурийг баримталж, авлигын эсрэг хууль тогтоомжийг дагаж мөрддөг. Бид авлигатай тэмцэх үр дүнтэй тогтолцоог хэрэгжүүлэн ажиллахыг зорьж байгаа бөгөөд бизнесийн түншүүддээсээ бидний энэхүү амлалтыг дэмжиж ажиллахыг ямагт уриалдаг.",
  },
];

const enEthicsData = [
  {
    icon: Users,
    title: "Social responsibility",
    description:
      "Our goal is to create sustainable and long-term opportunities for our communities to support social and economic development. We value cooperation and responsibility towards the environment and society in which we operate. For this purpose, we are working on defining the structure of environment, society and governance.",
  },
  {
    icon: Leaf,
    title: "ESG",
    description:
      "We believe that consistent adherence to environmental, social and governance (ESG) standards aligns with our business strategy and corporate values and enhances business credibility. We aim to create an accessible environment for our employees to develop. We consider the health and safety of our employees to be of utmost importance, so it is only natural that we adhere to ESG standards. We strive to contribute to the development of a green economy by combating climate change by developing low-carbon infrastructure.",
  },
  {
    icon: Users,
    title: "Equal opportunity and participation",
    description:
      "We strive to provide equal opportunity and participation to all employees. We aim to create a free and equal opportunity environment that does not discriminate based on age, gender, family, marital status, race, pregnancy, disability, religion, belief, or sexual orientation.",
  },
  {
    icon: Users,
    title: "Fair competition",
    description:
      "We value fair competition and prohibit any unfair practices that could harm the company's business. Company employees are prohibited from providing internal company confidential information to customers, suppliers and competitors or seeking, receiving or discussing confidential information from competitors. We comply with the Competition Law.",
  },
  {
    icon: ShieldCheck,
    title: "A commitment to human rights",
    description:
      "We respect the rights and dignity of our company's employees and colleagues. Everyone in the world has a role to play in ending human rights violations such as child labor, forced labor, human trafficking, and slavery. Therefore, if we believe that there is a violation of human rights within the internal operations of the company or our colleagues, we resolve it within the law without delay.",
  },
  {
    icon: FileText,
    title: "Legal compliance",
    description:
      "We work within the framework of the relevant laws and regulations of Mongolia and adhere to the rule of law in all our business dealings. Disciplinary procedures are in place for non-compliance with any laws, standards or policies.",
  },
  {
    icon: MessageSquare,
    title: "Freedom of speech",
    description:
      'We empower our employees to report any inappropriate behavior at any level of our business without worry. All issues raised in this context will be received and resolved accordingly. Responsible for communicating information about any issues through higher level officials and managers. If it is considered impossible, it will be reported in the "classified report of the company"',
  },
];

export const EthicsSection: React.FC = () => {
  const { language } = useLanguage();
  const ethicsData = language === "en" ? enEthicsData : mnEthicsData;

  return (
    <div className="relative group/section">
      <div className="flex overflow-x-auto pb-8 gap-6 snap-x scroll-smooth scrollbar-hide no-scrollbar px-2">
        {ethicsData.map((item, index) => (
          <div
            key={index}
            className="flex-none w-[85%] md:w-[calc(33.333%-1rem)] snap-start"
          >
            <AboutCard
              icon={item.icon}
              title={item.title}
              description={item.description}
              className="h-full"
            >
              {"children" in item ? (item as any).children : null}
            </AboutCard>
          </div>
        ))}
      </div>

      {/* Scroll indicator for UX */}
      <div className="flex items-center justify-center gap-2 mt-2 md:mt-4 text-gray-400">
        <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-[#0082b4] animate-[shimmer_2s_infinite]" />
        </div>
        <span className="text-xs font-medium uppercase tracking-wider">
          {language === "en" ? "Scroll to explore" : "Гүйлгэж үзнэ үү"}
        </span>
        <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-[#0082b4] animate-[shimmer_2s_infinite]" />
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
      `}</style>
    </div>
  );
};
