import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card } from "~/components/ui/card";
import { Label } from "~/components/ui/label";

const FeedbackGrid = () => {
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
        "City Print’s attention to detail is outstanding. The custom shirts I received exceeded my expectations in both quality and design.",
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
        "City Print’s custom clothing service is top-notch. The final product matched my design perfectly, and the customer service was outstanding.",
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
    <>
      <div className=" flex w-full items-center justify-center  " id="feedback">
        <Label
          id="1"
          className="   mt-20 text-4xl font-semibold   tracking-widest "
        >
          Client Feedback{" "}
        </Label>
      </div>
      <div className="mt-20 grid grid-cols-4   gap-4">
        {feedbacks.map((item, index) => {
          if (item.inner) {
            return (
              <Card
                key={index}
                className="bg-re col-span-4 rounded-lg border border-gray-200 bg-white p-4 shadow-lg"
              >
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-4 col-start-1 ">
                    <div className=" flex gap-4 rounded-lg border border-gray-200  p-4 shadow-md">
                      <div>
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>{" "}
                      <div>
                        <div>
                          <Label className=" text-blue-400">
                            {item.inner.name}
                          </Label>
                        </div>
                        <Label className="   font-semibold leading-6 text-gray-600">
                          {item.inner.feedback}
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          }
          return (
            <Card
              key={index}
              className=" border-gray-200p-4 flex items-start gap-4 rounded-lg border p-5 shadow-lg"
            >
              <div>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="">
                {" "}
                <div>
                  <Label className=" font-extrabold text-blue-400">
                    {item.name}
                  </Label>
                </div>
                <Label className="   font-semibold leading-6 text-gray-600">
                  {item.feedback}
                </Label>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default FeedbackGrid;
