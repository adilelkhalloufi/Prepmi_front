import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { Star, Quote } from "lucide-react";

interface Review {
  name: string;
  rating: number;
  review: string;
  avatar: string;
  initials: string;
}

const clientReviews: Review[] = [
  {
    name: "Sarah Johnson",
    rating: 5,
    review: "client_reviews.review1",
    avatar: "",
    initials: "SJ",
  },
  {
    name: "Ahmed Hassan",
    rating: 5,
    review: "client_reviews.review2",
    avatar: "",
    initials: "AH",
  },
  {
    name: "Maria Garcia",
    rating: 5,
    review: "client_reviews.review3",
    avatar: "",
    initials: "MG",
  },
];

export function ClientReviews() {
  const { t } = useTranslation();

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "fill-secondary text-secondary" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="relative overflow-hidden bg-primary min-h-[600px] flex items-center py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white uppercase mb-4">
            {t("client_reviews.title")}
          </h2>
          <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            {t("client_reviews.description")}
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {clientReviews.map((review, index) => (
            <Card
              key={index}
              className="group relative bg-white/10 backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg hover:shadow-2xl hover:shadow-white/10 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: "url(/zlig.png)",
                  backgroundRepeat: "repeat",
                  backgroundSize: "auto",
                }}
              ></div>
              {/* Accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-secondary via-white to-secondary"></div>

              <CardContent className="p-6">
                {/* Quote icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white/20 rounded-full group-hover:bg-white/30 transition-all duration-300">
                    <Quote className="w-6 h-6 text-white group-hover:text-secondary transition-colors duration-300" />
                  </div>
                </div>

                {/* Review text */}
                <blockquote className="text-white/90 group-hover:text-white text-center mb-6 leading-relaxed italic relative transition-colors duration-300">
                  <span className="text-4xl text-white/30 absolute -top-2 -left-2 font-serif">
                    "
                  </span>
                  {t(review.review)}
                  <span className="text-4xl text-secondary/30 absolute -bottom-4 -right-2 font-serif">
                    "
                  </span>
                </blockquote>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  <div className="flex space-x-1 p-2 bg-white/10 rounded-full border border-white/20">
                    {renderStars(review.rating)}
                  </div>
                </div>

                {/* Customer info */}
                <div className="flex items-center justify-center space-x-3">
                  <Avatar className="border-2 border-white/30 group-hover:border-white/50 transition-all duration-300">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback className="bg-white/20 text-white font-semibold">
                      {review.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white   transition-colors duration-300">
                      {review.name}
                    </h4>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
