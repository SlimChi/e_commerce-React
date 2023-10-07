import React from 'react';
import {
    Box,
    Container,
    Link,
    Typography,
    Button,
    Stack,
    useTheme,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './slider.css';
import IconSection from "./IconSection";

const mySlider = [
    { text: "MEN", link: "./images/banner-15.jpg" },
    { text: "WOMEN", link: "./images/banner-25.jpg" }, // Fixed image path
];

const Hero = () => {
    const theme = useTheme();
    SwiperCore.use([Pagination]);

    return (
        <Container>

            <Box sx={{ mt: 2.5, display: "flex", alignItems: "center", gap: 2  }}>
                <Swiper
                    loop={true}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    className="mySwiper"
                >
                    {mySlider.map((item) => (
                        <SwiperSlide key={item.link} className="parent-slider">
                            <img src={item.link} alt="" />
                            <Box
                                sx={{
                                    [theme.breakpoints.up("sm")]: {
                                        position: "absolute",
                                        left: "10%",
                                        textAlign: "left",
                                    },
                                    [theme.breakpoints.down("sm")]: {
                                        pt: 4,
                                        pb: 6,
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#222",
                                    }}
                                    variant="h5"
                                >
                                    LIFESTYLE COLLECTION
                                </Typography>

                                <Typography
                                    sx={{
                                        color: "#222",
                                        fontWeight: 500,
                                        my: 1,
                                    }}
                                    variant="h3"
                                >
                                    {item.text}
                                </Typography>

                                <Stack
                                    sx={{
                                        justifyContent: { xs: "center", sm: "left" },
                                    }}
                                    direction={"row"}
                                    alignItems={"center"}
                                >
                                    <Typography color={"#333"} mr={1} variant="h4">
                                        SALE UP TO
                                    </Typography>
                                    <Typography color={"#D23F57"} variant="h4">
                                        30% OFF
                                    </Typography>
                                </Stack>
                                <Typography
                                    sx={{
                                        color: "#000",
                                        fontWeight: 300,
                                        my: 1,
                                    }}
                                    variant="body1"
                                >
                                    Get Free Shipping on orders over $99.00
                                </Typography>

                                <Button
                                    sx={{
                                        px: 5,
                                        py: 1,
                                        mt: 2,
                                        backgroundColor: "#222",
                                        boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                        color: "#fff",
                                        borderRadius: "1px",
                                        "&:hover": {
                                            bgcolor: "#151515",
                                            boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                                        },
                                    }}
                                    variant="contained"
                                >
                                    shop now
                                </Button>
                            </Box>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <Box sx={{ display: {  xs: "none", md: "block", minWidth: "26.6%" } }}>
                    <Box sx={{mt: 2.5, position: "relative", gap: 2  }}>
                        <img width={"100%"} src=".//images/banner-18.jpg" alt="" />
                        <div>
                            <Stack
                                sx={{
                                    position: "absolute",
                                    top: "35%",
                                    transform: "translateY(-50%)",
                                    left: 25,
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#2B3445",
                                        fontSize: "11px",
                                    }}
                                >
                                    NEW ARRIVALS
                                </Typography>
                                <Typography
                                    variant="h8"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#2B3445",
                                        lineHeight: "11px",
                                        mt: 1,
                                    }}
                                >
                                    SUMMER
                                </Typography>
                                <Typography
                                    variant="h7"
                                    sx={{
                                        fontWeight: "bold",
                                        color: "#2B3445",
                                    }}
                                >
                                    SALE 20% OFF
                                </Typography>

                                <Link
                                    sx={{
                                        color: "#2B3445",
                                        display: "flex",
                                        fontWeight: "bold",
                                        alignItems: "center",
                                        gap: "5px",
                                        transition: "0.2s",

                                        "&:hover": {
                                            color: "#D23F57",
                                        },
                                    }}
                                    href="#"
                                    underline="none"
                                >
                                    shop now
                                    <ArrowForwardIcon sx={{ fontSize: "11px", fontWeight: "bold" }} />
                                </Link>
                            </Stack>
                        </div>

                    </Box>

                    <Box sx={{ position: "relative" }}>
                        <img width={"100%"} src="./images/banner-19.jpg" alt="" />
                        <Stack
                            sx={{
                                position: "absolute",
                                top: "9%",
                                transform: "translateY(-50%)",
                                left: 180,
                            }}
                        >
                            <Link
                                sx={{
                                    fontWeight: "bold",
                                    color: "#2B3445",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    transition: "0.2s",

                                    "&:hover": {
                                        color: "#D23F57",
                                    },
                                }}
                                href="#"
                                underline="none"
                            >
                                shop now
                                <ArrowForwardIcon sx={{ fontSize: "13px" }} />
                            </Link>
                        </Stack>
                    </Box>
                </Box>
            </Box>


            <IconSection />
        </Container>

    );
};

export default Hero;

