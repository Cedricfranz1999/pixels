"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowDown,
  Facebook,
  Twitter,
  Mail,
  Phone,
  Play,
  ShoppingCart,
  Smartphone,
  LayoutDashboard,
  Radius,
  Shirt,
  Menu,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { api } from "~/trpc/react";
import { type Product } from "~/types/product";
import DirectOrder from "../_components/client/direct-order/form";
import AddToCartForm from "../_components/client/cart/form";
import { useUser } from "@clerk/nextjs";
import SlideShowProduct from "./(components)/SlideShow";
import VideoPromotion from "./promotional-video/page";
import EmailProvider from "../_components/email/EmailProvider";

const CityPrintLandingPage = () => {
  const router = useRouter();
  const [indexTag, setIndex] = useState<number | null>(null);
  const [searchKey, setSearchKey] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<number>();
  const [isAddToCartOpen, setIsAddToCartOpen] = useState<boolean>(false);
  const [isDirectOrderOpen, setIsDirectOrderOpen] = useState<boolean>(false);
  const [item, setItem] = useState<Product | null>(null);
  const [orderItem, setOrderItem] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { data: categories } = api.category.getAllCategories.useQuery();
  const { data: products, refetch } =
    api.client_products.getAllProducts.useQuery({
      category: categoryFilter,
      search: searchKey,
    });
  const { data: userLogin } = api.user.getUserLogin.useQuery();

  const menuItems = [
    { label: "Home", route: "/cityPrint" },
    { label: "Design", route: "#sampleDesign" },
    { label: "Product", route: "#otherProducts" },
    { label: "Service", route: "#services" },
    { label: "Feedback", route: "#feedback" },
    { label: "Contact", route: "#contact" },
  ];

  const handleNavigation = (route: string) => {
    if (route.startsWith("#")) {
      const element = document.querySelector(route);
      if (element) {
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.pageYOffset,
          behavior: "smooth",
        });
      }
    } else {
      router.push(route);
    }
    setMobileMenuOpen(false);
  };

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onSearch = async (value: string) => {
    setSearchKey(value);
    await refetch();
  };

  const onCategoryFilter = async (value: string) => {
    setCategoryFilter(parseInt(value));
    await refetch();
  };

  const handleAddToCart = (item: Product) => {
    if (!userLogin) {
      router.push("/sign-in");
    } else if (userLogin?.userType === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      setIsAddToCartOpen(true);
      setItem(item);
    }
  };

  const handleDirectOrder = (item: Product) => {
    if (!userLogin) {
      router.push("/sign-in");
    } else if (userLogin?.userType === "ADMIN") {
      router.push("/admin/dashboard");
    } else {
      setIsDirectOrderOpen(true);
      setOrderItem(item);
    }
  };

  const feedbacks = [
    {
      name: "Alice",
      feedback:
        "City Print provided excellent service with my custom T-shirt order. The quality of the print was top-notch, and the delivery was prompt.",
    },
    {
      name: "Bob",
      feedback:
        "I was impressed with the variety of designs City Print offers. The custom jerseys I ordered were perfect and exactly what I wanted.",
    },
    {
      name: "Charlie",
      feedback:
        "The team at City Print is incredibly reliable. My order for custom hoodies was completed on time, and the printing was flawless.",
    },
    {
      name: "David",
      feedback:
        "City Print's attention to detail is outstanding. The custom shirts I received exceeded my expectations in both quality and design.",
    },
    {
      name: "Eve",
      feedback:
        "I had a great experience with City Print. Their tailoring service was precise, and the custom garments fit perfectly.",
    },
    {
      name: "Frank",
      feedback:
        "City Print offers exceptional customer support. They guided me through the design process and ensured my order was just right.",
    },
    {
      name: "Grace",
      feedback:
        "The custom T-shirts I ordered from City Print were a hit at our event. The print quality and fabric were both excellent.",
    },
    {
      name: "Hannah",
      feedback:
        "City Print's custom clothing service is top-notch. The final product matched my design perfectly, and the customer service was outstanding.",
    },
    {
      inner: {
        name: "Isaac",
        feedback:
          "My experience with City Print was nothing short of extraordinary. From the initial consultation to the final delivery, their team demonstrated exceptional professionalism and attention to detail. I had a complex order involving a variety of custom prints and tailoring, and they handled every aspect with care and precision. The quality of the materials used was impeccable, and the final products far exceeded my expectations. The customer service was also top-notch, with prompt responses to my inquiries and updates throughout the process. I would highly recommend City Print to anyone in need of high-quality custom clothing and exceptional service.",
      },
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white px-4 py-4 shadow-md lg:px-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo.png"
              alt="City Print Logo"
              width={100}
              height={100}
              className="mr-2"
            />
            <Label className="text-2xl font-bold md:text-3xl">
              <span className="text-blue-600">City</span>
              <span className="text-orange-600">Print</span>
            </Label>
          </div>
          <nav className="hidden md:flex md:items-center md:gap-4 lg:gap-7">
            {menuItems.map((item) => (
              <Label
                key={item.label}
                className="cursor-pointer rounded-md p-2 font-bold tracking-widest hover:bg-blue-600 hover:text-white"
                onClick={() => handleNavigation(item.route)}
              >
                {item.label}
              </Label>
            ))}
            <div className=" mt-7 flex flex-col gap-2">
              <button
                onClick={() => router.push("/sign-in")}
                className="rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Sign In
              </button>
              <p
                className=" cursor-pointer text-xs text-blue-500 underline hover:text-blue-600 "
                onClick={() => router.push("sign-up")}
              >
                {" "}
                click here Signup{" "}
              </p>
            </div>
          </nav>
          <Button
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        {mobileMenuOpen && (
          <nav className="mt-4 flex flex-col gap-2 md:hidden">
            {menuItems.map((item) => (
              <Label
                key={item.label}
                className="cursor-pointer rounded-md p-2 font-bold tracking-widest hover:bg-blue-600 hover:text-white"
                onClick={() => handleNavigation(item.route)}
              >
                {item.label}
              </Label>
            ))}
            <button
              onClick={() => router.push("/sign-in")}
              className="mt-2 rounded-lg bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Sign In
            </button>
          </nav>
        )}
      </header>

      <main className="flex-grow px-4 pt-8 lg:px-20">
        {/* Intro Section */}
        <section
          className="flex flex-col items-center md:flex-row md:justify-between"
          id="intro"
        >
          <div className="mb-8 w-full md:mb-0 md:w-1/2">
            <div className="mb-4 flex items-center">
              <Label className="text-3xl font-extrabold tracking-wider md:text-5xl lg:text-6xl">
                Design and create,
              </Label>
              <Card className="ml-2 bg-[#210C85] p-2 md:p-3">
                <Play className="text-lg font-extrabold text-white md:text-xl" />
              </Card>
            </div>
            <div className="mb-4 flex items-center gap-2 md:gap-3">
              <Label className="text-3xl font-extrabold tracking-widest md:text-5xl lg:text-6xl">
                your perfect
              </Label>
              <Label className="text-3xl font-extrabold tracking-widest text-[#211967] md:text-5xl lg:text-6xl">
                Clothing
              </Label>
            </div>
            <div className="mt-4 flex flex-col gap-3 text-gray-600 md:mt-8 lg:mt-12">
              <Label>
                We bring your designs to life with high-quality printing on
                T-shirts, clothes, jerseys, and much more. Whether youre looking
                to create custom apparel for your team, promote your brand, or
                express your personal style, weve got you covered. Our
                state-of-the-art printing technology and attention to detail
                ensure vibrant results.
              </Label>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row md:mt-8">
                <Button
                  className="rounded-md bg-[#1F0F8B] px-6 py-2 text-white shadow-sm hover:brightness-90 md:px-8"
                  onClick={() => handleScrollToSection("2")}
                >
                  Start Learning
                </Button>
                <Button className="flex items-center justify-center gap-2 rounded-md border-2 border-black bg-white px-6 py-2 text-black shadow-sm hover:bg-blue-50 md:px-8">
                  Watch video
                  <ArrowDown
                    size={20}
                    className="animate-pulse rounded-md bg-blue-800 p-1 text-white"
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:pl-8">
            <Card className="bg-[#1F0F8B] p-4">
              <img
                src="/intro.png"
                alt="Intro Image"
                width={500}
                height={500}
              />
            </Card>
          </div>
        </section>

        <VideoPromotion />

        {/* Sample Design Section */}
        <section
          className="mt-16 flex flex-col gap-10 md:mt-32"
          id="sampleDesign"
        >
          <Label className="text-center text-2xl font-semibold tracking-widest md:text-3xl lg:text-4xl">
            Finished Design for Our Valued Clients
          </Label>
          <SlideShowProduct />
        </section>

        {/* Offer Section */}
        <section
          className="mt-16 flex flex-col items-center gap-8 md:mt-32 md:flex-row"
          id="offer"
        >
          <div className="flex w-full flex-col gap-5 md:w-2/3">
            <Label className="text-2xl font-semibold tracking-widest md:text-3xl lg:text-4xl">
              We cater to all skillsets
            </Label>
            <Label id="2" className="pr-0 leading-6 text-gray-600 md:pr-8">
              With a commitment to exceptional customer service, we make the
              process of creating your custom prints seamless and enjoyable. Our
              experienced team is here to assist you every step of the way, from
              design to delivery. We offer a variety of printing techniques to
              suit your specific needs, ensuring your designs are showcased at
              their best. Choose City Print for your printing needs and
              experience the perfect blend of quality, creativity, and
              reliability.
            </Label>
          </div>
          <div className="w-full md:w-1/3">
            <Card className="relative w-full bg-orange-50 p-2 shadow-2xl drop-shadow-2xl md:w-fit">
              <img
                src="/tshit11.jpg"
                alt="T-shirt"
                width={250}
                height={250}
                className="mx-auto rounded-lg md:mx-0"
              />
            </Card>
          </div>
        </section>

        {/* Service Section */}
        <section
          className="mt-16 grid grid-cols-1 gap-8 md:mt-32 md:grid-cols-3"
          id="services"
        >
          <Card className="flex flex-col items-center justify-center gap-7 border-2 border-black bg-[#fdfcfc] p-4 px-7">
            <LayoutDashboard
              size={60}
              className="rounded-sm bg-[#1F0F8B] px-4 py-3 text-white md:px-6 md:py-4"
            />
            <Label className="text-xl font-semibold tracking-tighter md:text-2xl">
              Design Your Custom T-Shirts
            </Label>
            <Label className="text-center text-sm leading-5 text-gray-600">
              We make it easy for you to design your own T-shirts with our
              intuitive tools and high-quality printing services. Customize your
              designs to reflect your style, message, or brand.
            </Label>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-7 border-2 bg-[#1F0F8B] p-4 px-7">
            <Radius
              size={60}
              className="rounded-sm bg-white px-4 py-3 text-[#1F0F8B] md:px-6 md:py-4"
            />
            <Label className="text-xl font-semibold tracking-tighter text-white  md:text-2xl">
              Perfect Fit for Every Size
            </Label>
            <Label className="text-center text-sm leading-5 text-white">
              At City Print, we offer a wide range of sizes to ensure the
              perfect fit for everyone. Customize your apparel to match your
              exact size requirements, from XS to 5XL and beyond.
            </Label>
          </Card>
          <Card className="flex flex-col items-center justify-center gap-7 border-2 border-black p-4 px-7">
            <Shirt
              size={60}
              className="rounded-sm bg-[#1F0F8B] px-4 py-3 text-white md:px-6 md:py-4"
            />
            <Label className="text-xl font-semibold tracking-tighter text-black md:text-2xl">
              Choose Your Preferred Fabric
            </Label>
            <Label className="text-center text-sm leading-5 text-gray-600">
              Select from a variety of fabric options to create your ideal
              custom clothing. Whether you prefer soft, breathable cotton,
              durable polyester, or a blend of materials, we have the perfect
              fabric for your needs.
            </Label>
          </Card>
        </section>

        {/* Our Products Section */}
        <section
          className="mt-16 flex flex-col gap-10 md:mt-32"
          id="otherProducts"
        >
          <Label className="text-center text-2xl font-semibold tracking-widest md:text-3xl lg:text-4xl">
            Our Clothing Products
          </Label>
          <div className="flex flex-col gap-8 md:flex-row">
            <Card className="w-full p-4 shadow-md md:w-1/4">
              <Input
                placeholder="Search Products"
                className="mb-6 border border-solid border-orange-500"
                value={searchKey}
                onChange={(e) => onSearch(e.target.value)}
                type="text"
              />
              <RadioGroup defaultValue="ALL" onValueChange={onCategoryFilter}>
                {categories?.map((category, index) => (
                  <div
                    key={index}
                    className="my-2 flex flex-col items-start justify-center font-bold text-blue-400"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <RadioGroupItem value={String(category.id)} />
                      <Label htmlFor={category.key}>{category.key}</Label>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </Card>
            <Card className="w-full p-4 shadow-md md:w-3/4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products?.map((product: Product, index) => {
                  const totalOrders = product.orders
                    .map((order: any) => order.quantity)
                    .reduce((acc: any, curr: any) => acc + curr, 0);

                  return (
                    <div
                      key={index}
                      className="relative flex flex-col items-center gap-5"
                      onMouseEnter={() => setIndex(index)}
                      onMouseLeave={() => setIndex(null)}
                    >
                      <div
                        className={`absolute bottom-20 flex items-start justify-center gap-5 ${
                          index === indexTag ? "" : "hidden"
                        }`}
                      >
                        <Button
                          className="bg-yellow-600"
                          onClick={() => handleAddToCart(product)}
                        >
                          <span className="flex gap-2">
                            <ShoppingCart className="h-4 w-4" />
                            Add To Cart
                          </span>
                        </Button>
                        <Button
                          className="bg-orange-600"
                          onClick={() => handleDirectOrder(product)}
                        >
                          Order Now
                        </Button>
                      </div>
                      <img
                        src={product.image ? product.image : "/tshit1.png"}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="rounded-lg"
                      />
                      <div className="flex flex-col gap-3">
                        <Label className="text-center text-lg font-semibold tracking-widest">
                          {product.name}
                        </Label>
                        <div className="flex items-center justify-between gap-3 px-4 font-medium">
                          <Label>Price: Php {product.price}</Label>
                          <Label>| {totalOrders} sold</Label>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mt-16 md:mt-32" id="feedback">
          <Label className="mb-10 block text-center text-2xl font-semibold tracking-widest md:text-3xl lg:text-4xl">
            Client Feedback
          </Label>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {feedbacks.map((feedback: any, index) => {
              if ("inner" in feedback) {
                return (
                  <Card
                    key={index}
                    className="col-span-full rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
                  >
                    <div className="flex gap-4 rounded-lg border border-gray-200 p-4 shadow-md">
                      <Avatar>
                        <AvatarImage
                          src={`https://i.pravatar.cc/150?img=${index + 1}`}
                          alt={feedback.inner.name}
                        />
                        <AvatarFallback>
                          {feedback?.inner?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Label className="font-extrabold text-blue-400">
                          {feedback?.inner?.name}
                        </Label>
                        <p className="mt-2 text-sm text-gray-600">
                          {feedback?.inner?.feedback}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              }
              return (
                <Card
                  key={index}
                  className="flex items-start gap-4 rounded-lg border p-5 shadow-lg"
                >
                  <Avatar>
                    <AvatarImage
                      src={`https://i.pravatar.cc/150?img=${index + 1}`}
                      alt={feedback.name}
                    />
                    <AvatarFallback>{feedback.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label className="font-extrabold text-blue-400">
                      {feedback.name}
                    </Label>
                    <p className="mt-2 text-sm text-gray-600">
                      {feedback.feedback}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Update Card Section */}
        <section className="my-16 flex justify-center md:my-32" id="update">
          <Card className="flex w-full max-w-4xl flex-col items-center gap-6 rounded-md bg-blue-400 px-4 py-8 md:px-8 lg:px-16">
            <Label
              className="text-center text-xl text-white md:text-2xl lg:text-3xl"
              style={{ wordSpacing: "10px" }}
            >
              Get Our Updates
            </Label>
            <Label className="text-center text-sm leading-6 text-white md:text-base">
              Stay updated with City Prints latest news and exclusive offers! By
              subscribing, youdll receive early access to our newest T-shirt
              designs and custom clothing services. Join our community of
              fashion enthusiasts and never miss out on our latest creations.
            </Label>
            <div className="flex w-full flex-col items-center gap-2 sm:flex-row">
              <Input
                className="w-full flex-grow bg-white text-black sm:w-auto"
                placeholder="Enter your email address"
              />
              <Button className="w-full animate-pulse whitespace-nowrap bg-blue-500 sm:w-auto">
                Subscribe
              </Button>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer
        className="flex w-full flex-col items-center justify-between gap-8 bg-blue-400 px-4 py-8 md:flex-row md:px-20"
        id="contact"
      >
        <div className="flex flex-col items-center gap-4 md:items-start">
          <Label className="text-xl font-extrabold text-white">
            Contact us
          </Label>
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex items-center gap-2">
              <Phone className="text-white" />
              <Label className="font-bold text-white">09392223882</Label>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="text-white" />
              <Label className="font-bold text-white">09392223882</Label>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Label className="text-xl font-extrabold text-white">Address</Label>
          <div className="flex flex-col items-center gap-2">
            <Label className="text-center font-bold text-white">
              Rueda st. corner Cajurao st
            </Label>
            <Label className="font-bold text-white">Calbayog City Samar</Label>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Label className="text-xl font-extrabold text-white">
            Social Media
          </Label>
          <div className="flex items-center gap-7">
            <Facebook
              className="cursor-pointer text-white"
              onClick={() =>
                router.push(
                  "https://www.facebook.com/people/CityPrint-Sublimation-Sportswear/100084044829331/",
                )
              }
            />
            <Twitter className="cursor-pointer text-white" />
            <EmailProvider />
          </div>
        </div>
      </footer>

      <AddToCartForm
        open={isAddToCartOpen}
        setOpen={setIsAddToCartOpen}
        item={item}
        setItem={setItem}
        refetch={refetch}
        refetchCart={() => refetch()}
      />

      <DirectOrder
        open={isDirectOrderOpen}
        setOpen={setIsDirectOrderOpen}
        item={orderItem}
        refetch={refetch}
        setItem={setOrderItem}
        refetchOrderedItems={() => refetch()}
      />
    </div>
  );
};

export default CityPrintLandingPage;
