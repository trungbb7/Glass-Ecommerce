import type { BreadcrumbData } from "@/components/Breadcrumb/Breadcrumb";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import { Button } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  faEnvelope,
  faHouse,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const breadcrumbData: BreadcrumbData[] = [
  { name: "Trang chủ", path: "/", icon: <FontAwesomeIcon icon={faHouse} /> },
  {
    name: "Liên hệ",
    path: "/contact",
  },
];

export default function Contact() {
  return (
    <div className="text-text1">
      <Header />

      {/* Body */}
      <div className="mt-10 mb-30 px-30">
        {/* Breadcrum */}
        <div className="pt-4 pb-10">
          <Breadcrumb data={breadcrumbData} />
        </div>

        <div className="flex gap-4 ">
          {/* Left side */}
          <div className="flex-1 bg-white shadow rounded-2xl px-6 py-10 ">
            {/* Call to us */}
            <div className=" flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-secondary">
                  <FontAwesomeIcon icon={faPhone} className="text-white" />
                </div>
                <p className="font-medium text-lg">Gọi cho chúng tôi</p>
              </div>
              <p className="font-medium">
                Chúng tôi luôn sẵn sàng 24/7, 7 ngày 1 tuần
              </p>
              <p className="font-medium">Điện thoại: +84367784857</p>
              <div className="h-px bg-black mt-6"></div>
            </div>

            {/* Write to us */}
            <div className=" flex flex-col gap-3 mt-8">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-secondary">
                  <FontAwesomeIcon icon={faEnvelope} className="text-white" />
                </div>
                <p className="font-medium text-lg">Gửi cho chúng tôi</p>
              </div>
              <p className="font-medium">
                Điền vào form và chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ
              </p>
              <p className="font-medium">Emails: customer@glasseshub.com</p>
              <p className="font-medium">Emails: support@glasseshub.com</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-3 flex flex-col gap-4 bg-white shadow rounded-2xl p-10">
            <div className="flex justify-between">
              <input
                type="text"
                placeholder="Tên của bạn"
                className="p-3 bg-primary-light outline-secondary min-w-66"
                required
              />
              <input
                type="text"
                placeholder="Email của bạn"
                className="p-3 bg-primary-light outline-secondary min-w-66"
                required
              />
              <input
                type="text"
                placeholder="Số điện thoại của bạn"
                className="p-3 bg-primary-light outline-secondary min-w-66"
                required
              />
            </div>
            <textarea
              name="message"
              id="message"
              placeholder="Tin nhắn của bạn"
              className="p-3 bg-primary-light outline-secondary h-60 w-full"
            ></textarea>
            <div>
              <Button type="primary" className="float-right">
                Gửi
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
