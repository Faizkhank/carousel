import React, { useEffect, useState, useRef } from "react";
import data from "./Store";
import {
  Box,
  Button,
  CardMedia,
  Grid,
  Typography,
  ImageListItem,
  ImageList,
} from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import PlayCircleFilledWhiteIcon from "@mui/icons-material/PlayCircleFilledWhite";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [SlideAuto, setSlideAuto] = useState(false);
  const imageListRef = useRef(null);
  useEffect(() => {
    if (SlideAuto) {
      const slideInterval = setInterval(() => {
        handleNextClick();
      }, 3000);

      return () => clearInterval(slideInterval);
    }
  }, [SlideAuto, activeIndex]);
  const handleNextClick = () => {
    const imageListEl = imageListRef.current;
    const itemWidth = imageListEl.scrollWidth / data.length;
    setActiveIndex((prevIndex) => {
      if (prevIndex === data.length - 1) {
        imageListEl.scrollTo({ left: 0, behavior: "smooth" });
        return 0;
      } else {
        imageListEl.scrollLeft += itemWidth;
        return prevIndex + 1;
      }
    });
  };
  const handlePrevClick = () => {
    const imageListEl = imageListRef.current;
    const itemWidth = imageListEl.scrollWidth / data.length;
    setActiveIndex((prevIndex) => {
      if (prevIndex === 0) {
        imageListEl.scrollTo({
          left: imageListEl.scrollWidth,
          behavior: "smooth",
        });
        return data.length - 1;
      } else {
        imageListEl.scrollLeft -= itemWidth;
        return prevIndex - 1;
      }
    });
  };
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}
    >
      <Grid width={{ lg: "85%", sm: "90%", xs: "95%" }} height="auto">
        <Box sx={{ display: "flex", borderRadius: "10px", boxShadow: "none" }}>
          <Box
            sx={{
              width: "70%",
              borderRadius: "20px",
              overflow: "hidden",
            }}
          >
            <Box
              height={{ xs: 400, sm: 550, md: 600, lg: 700 }}
              sx={{
                width: "100%",
                borderRadius: "20px",
                overflow: "hidden",
                "& img": {
                  width: "100%",
                  height: "95%",
                  objectFit: "cover",
                  borderRadius: "25px",
                },
              }}
            >
              <img src={data[activeIndex].Image} alt="image_wallpaper" />
            </Box>
            <Box sx={{ display: "flex", width: "100%" }}>
              <Button
                onClick={() => {
                  handlePrevClick();
                }}
              >
                <ArrowLeftIcon
                  sx={{ width: 100, height: 100, color: "black" }}
                />
              </Button>
              <ImageList
                sx={{
                  gridAutoFlow: "column",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(160px,1fr)) !important",
                  gridAutoColumns: "minmax(160px, 1fr)",
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                ref={imageListRef}
              >
                {data.map((items, index) => (
                  <ImageListItem key={index}>
                    <CardMedia
                      onClick={() => {
                        setActiveIndex(index);
                      }}
                      style={
                        activeIndex === index
                          ? { filter: "grayscale(0%)" }
                          : { filter: "grayscale(100%)" }
                      }
                      sx={{
                        width: 160,
                        height: 160,
                        objectFit: "contain",
                        borderRadius: "20px",
                        margin: "5px",
                      }}
                      image={items.Image}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
              <Button
                onClick={() => {
                  handleNextClick();
                }}
              >
                <ArrowRightIcon
                  sx={{ width: 100, height: 100, color: "black" }}
                />
              </Button>
            </Box>
          </Box>

          <Box
            height={{ xs: 240, sm: 550, md: 600, lg: 700 }}
            paddingLeft={{ xs: 0, lg: 10 }}
            sx={{ justifyContent: "center", width: "40%" }}
          >
            <Typography
              sx={{
                padding: 2,
                fontSize: 40,
                color: "grey",
                overflow: "hidden",
                height: 50,
              }}
            >
              {data[activeIndex].Title}
            </Typography>
            <Box
              height={{ xs: 290, sm: 440, md: 500, lg: 580 }}
              sx={{ overflow: "clip" }}
            >
              <Typography
                sx={{
                  width: "100%",
                  padding: 2,
                  overflow: "hidden",
                  height: "auto",
                  color: "grey",
                }}
              >
                {data[activeIndex].Desc}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                sx={{
                  borderRadius: "100%",
                  height: 120,
                  width: 120,
                  padding: 0,
                  marginTop: 8,
                }}
                onClick={() => {
                  setSlideAuto(!SlideAuto);
                }}
              >
                {!SlideAuto ? (
                  <PlayCircleFilledWhiteIcon
                    sx={{ width: 120, height: 120, color: "#00FFFF" }}
                  />
                ) : (
                  <PauseCircleIcon
                    sx={{ width: 120, height: 120, color: "#00FFFF" }}
                  />
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default Carousel;
