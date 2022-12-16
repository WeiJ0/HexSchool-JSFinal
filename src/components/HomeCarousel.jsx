import { Carousel } from '@mantine/carousel';
import { Title, Box, ActionIcon, Flex } from '@mantine/core';
import { IconHeart } from '@tabler/icons';

import PortfolioCard from './cards/PortfolioCard';

const HomeCarousel = ({type}) => {
    const IconStyle = {
        "& svg": {
            fill: "#F14A4A"
        }
    }


    return (
        <>
            <Box mt={80}>
                <Box>
                    <Flex align="center" sx={IconStyle}>
                        <IconHeart size={30} color="#F14A4A" />
                        <Title order={2} ml={10} fw={700} color="#1E1E1E">最多人喜歡作品集</Title>
                    </Flex>
                </Box>

                <Carousel loop mt={48} slidesToScroll={4} slideSize="25%" slideGap={24}>
                    <Carousel.Slide><PortfolioCard /></Carousel.Slide>
                    <Carousel.Slide><PortfolioCard /></Carousel.Slide>
                    <Carousel.Slide><PortfolioCard /></Carousel.Slide>
                    <Carousel.Slide><PortfolioCard /></Carousel.Slide>
                </Carousel>
            </Box>
        </>
    )
}

export default HomeCarousel;