"use client";

import { useState } from "react";
import { Leaf, Heart, TrendingUp } from "lucide-react";
import { AboutCard } from "@/components/About/AboutCard";
import { EthicsSection } from "@/components/About/EthicsSection";
import { useLanguage } from "@/context/LanguageContext";
import { TeamSection } from "@/components/About/TeamSection";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<"values" | "ethics">("values");
  const { language } = useLanguage();

  const isEn = language === "en";

  return (
    <div className="min-h-screen pt-24 px-6 md:px-10 xl:px-20 max-w-7xl mx-auto pb-20 overflow-x-hidden">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#0082b4] tracking-tight">
          {isEn ? "Excellence together" : "Сайныг хамтдаа бүтээнэ"}
        </h1>
        <div className="text-gray-600 space-y-4 max-w-4xl text-lg leading-relaxed">
          <p>
            {isEn
              ? "Business ethics is our core value, through supporting, building capacity of our employees will help us to continue to deliver good and quality services to our customers."
              : "Бид бизнесийн ёс зүйг эрхэмлэн, ажилтан бүрийнхээ хөгжлийг дэмжиж, хэрэглэгч, харилцагчдадаа сайн, чанартай үйлчилгээг тасралтгүй хүргэсээр байна."}
          </p>
          <p>
            {isEn
              ? "With the motto 'Building Better Together', our team successfully expands its activities in construction, transport logistics, foreign trade, real estate brokerage, leasing, elevator installation, maintenance, automotive parts and service, and camel milk production."
              : "“Илүү сайныг хамтдаа бүтээе” уриатай манай хамт олон барилга угсралт, тээвэр логистик, гадаад худалдаа, үл хөдлөх хөрөнгийн зуучлал, түрээс, цахилгаан шатны угсралт, суурилуулалт болон автомашины тоноглол, сэлбэг хэрэгслийн худалдаа, засвар үйлчилгээ мөн ингэний хуурай сүүн үйлдвэрлэл зэрэг салбарт үйл ажиллагаагаа өргөжүүлэн амжилттай ажиллаж байна."}
          </p>
        </div>
      </div>

      <div className="flex flex-col transition md:flex-row w-full bg-gray-100/50 backdrop-blur-sm rounded-xl p-1.5 gap-1 mb-12 border border-gray-200/50 shadow-inner">
        <button
          onClick={() => setActiveTab("values")}
          className={`flex-1 py-4 text-center rounded-lg font-semibold transition-all duration-300 ${
            activeTab === "values"
              ? "bg-[#0082b4] text-white shadow-lg"
              : "text-gray-500 hover:bg-white/80 hover:text-gray-700"
          }`}
        >
          {isEn ? "Core Values" : "Үнэт зүйл"}
        </button>
        <button
          onClick={() => setActiveTab("ethics")}
          className={`flex-1 py-4 text-center rounded-lg font-semibold transition-all duration-300 ${
            activeTab === "ethics"
              ? "bg-[#0082b4] text-white shadow-lg"
              : "text-gray-500 hover:bg-white/80 hover:text-gray-700"
          }`}
        >
          {isEn ? "Business Ethics Policy" : "Бизнесийн ёс зүйн бодлого"}
        </button>
      </div>

      <div className="min-h-[400px]">
        {activeTab === "values" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-500">
            <AboutCard
              icon={Leaf}
              title={isEn ? "Ethics" : "Ёс зүй"}
              bgColor="bg-[#f0f8ff]"
              description={
                isEn
                  ? "We prioritize ethics in all internal and external relationships and partnerships. We put the collective interests of implemented projects, clients, customers, and employees first. We strictly adhere to ethics by acting responsibly towards the environment and society."
                  : "Бид компанийн гаднах болон доторх бүхий л харилцаа холбоо, хамтралд ёс зүйг чухалчлан үздэг бөгөөд хэрэгжүүлж буй төслүүд, харилцагчид, үйлчлүүлэгчид болон ажилчдын хамтын эрх ашгийг урьтал болгодог. Түүнчлэн хүрээлэн буй орчин болон нийгэмдээ ёс зүйтэй хандах, нийгмийн өмнө хүлээсэн хариуцлагаа бүрэн ухамсарлах зэргээр ёс зүйг чандлан сахидаг билээ."
              }
            />
            <AboutCard
              icon={Heart}
              title={isEn ? "Sincerity" : "Чин сэтгэл"}
              bgColor="bg-[#fff0f5]"
              description={
                isEn
                  ? "Regardless of the scope or importance of the work being performed, our company focuses on every detail and prioritizes a sincere approach. This principle is fundamental to every unit of the company."
                  : "Манай компани хийж гүйцэтгэж байгаа ажлын хэмжээ, чухлын зэргээс үл хамааран ажил бүрийн деталь-д анхаарч аливаад чин сэтгэлээр хандах хандлагыг эрхэмлэдэг бөгөөд энэхүү зарчим нь компанийн эд эс, нэгж бүрд тавигддаг үндсэн зарчим юм."
              }
            />
            <AboutCard
              icon={TrendingUp}
              title={isEn ? "Improvement" : "Сайжруулалт"}
              bgColor="bg-[#f0fff0]"
              description={
                isEn
                  ? "We strive for sustainable development by constantly improving organizational culture, productivity, work quality, and employee and customer satisfaction. We work hard every day to deliver better for everyone."
                  : "Бид байгууллагын соёл, ажлын бүтээмж, ажлын чанар, ажилтан болон харилцагчийн сэтгэл ханамжийг байнгын сайжруулж тогтвортой хөгжлийг эрхэмлэн ажидаг. Бидний алсын хараа болох хүн бүрд илүү сайныг хүргэхийн төлөө бид хамтын хүчээр өдөр бүр хичээн ажиллаж байна."
              }
            />
          </div>
        ) : (
          <div className="transition-all duration-500">
            <EthicsSection />
            <div className="mt-16 text-center">
              <div className="inline-block bg-[#0082b4]/5 border border-[#0082b4]/10 p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#0082b4]" />
                <p className="text-gray-600 italic font-medium max-w-3xl mx-auto text-base leading-relaxed relative z-10">
                  {isEn
                    ? "“The main purpose of this policy is to adhere to ethical norms in our business activities. This is a comprehensive set of actions expected from every individual, company, and organization we work with. Furthermore, it clarifies the duties and responsibilities of the parties.”"
                    : "“Бизнесийн үйл ажиллагаандаа ёс зүйн хэм хэмжээг баримтлан ажиллахад энэхүү бодлогын гол зорилго оршино. Энэ нь хамтран ажилладаг хувь хүн, компани, байгууллага бүрийн биднээс хүлээх үйл ажиллагааны цогц байна. Түүнчлэн талуудын хүлээсэн үүрэг, хариуцлагыг тодотгоно.”"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <TeamSection />
    </div>
  );
}
