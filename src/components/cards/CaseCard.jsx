import { Card, Divider, Avatar, Title, Text, Badge, Button, Group } from '@mantine/core';
import { IconBrandPython } from '@tabler/icons';
import { useRouter } from 'next/router';
import { addCommasToNumber } from "../../helpers/number";

const CaseCard = ({ data }) => {
    const router = useRouter();

    const { id, title, content, serviceType, minPrice, maxPrice } = data;

    const cardStyle = {
        cursor: 'pointer',
        "&:hover": {
            boxShadow: "0 0 0 2px #52C8FF",
            transform: "translateY(-2px)",
        }
    }

    const contentStyle = {
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        '-webkit-line-clamp': '2'
    }

    const toDetail = (id) => {
        router.push(`/Case/${id}`)
    }

    return (
        <>
            <Card shadow="sm" p={20} radius="md" w={{ base: 300, md: "100%" }} sx={cardStyle} onClick={() => toDetail(id)}>
                <Group position="center" sx={{ flexWrap: 'nowrap', alignItems: 'center' }}>
                    <Avatar color="custom-primary.1" radius="xl" sx={{ flex: 1 }}>
                        <IconBrandPython color="white" size={24} />
                    </Avatar>
                    <Title order={5} size={16} lineClamp={1} sx={{ flex: 3 }}>{title}</Title>
                </Group>

                <Text size="sm" lineClamp={2} h={42} color="#8A8A8B" mt={12} mb={16}>
                    {content.replaceAll('<br/>', '')}
                </Text>

                <Divider my="sm" />

                <Group position="apart" align="center" justify="space-between">
                    <Text size={16} fw={500} color="custom-primary.1">{addCommasToNumber(minPrice)} - {addCommasToNumber(maxPrice)}</Text>
                    <Badge size='xl' variant="filled" color="custom-green.1" fw={500} fs={16}>{serviceType === 'remote' ? '可遠端' : '不可遠端'}</Badge>
                </Group>
            </Card>
        </>
    )
}

export default CaseCard;