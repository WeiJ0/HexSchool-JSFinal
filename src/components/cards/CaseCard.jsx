import { Card, Divider, Avatar, Title, Text, Badge, Button, Group } from '@mantine/core';
import { IconBrandPython } from '@tabler/icons';

const CaseCard = () => {
    return (
        <>
            <Card shadow="sm" p={20} radius="md" w={{base: 300, md: "100%"}}>
                <Group position="center">
                    <Avatar color="custom-primary.1" radius="xl">
                        <IconBrandPython color="white" size={24} />
                    </Avatar>
                    <Title order={5}>徵求 Python 家教</Title>
                </Group>

                <Text size="sm" color="#8A8A8B" mt={12} mb={16}>
                    徵求一名家教，可配合時間 為週一、週三、週四、週五
                </Text>
                
                <Divider my="sm" />

                <Group position="apart" align="center" justify="space-between">
                    <Text size={20} fw={500} color="custom-primary.1">5000 - 10000</Text>
                    <Badge size='xl' variant="filled" color="custom-green.1" fw={500} fs={16}>可遠端</Badge>
                </Group>
            </Card>
        </>
    )
}

export default CaseCard;