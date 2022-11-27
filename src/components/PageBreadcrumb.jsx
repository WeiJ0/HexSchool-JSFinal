import { Breadcrumbs, Anchor } from '@mantine/core';

const PageBreadcrumb = ({pageData}) => {
    const items = pageData.map((item, index) => (
        <Anchor href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    return (
        <>
            <Breadcrumbs>{items}</Breadcrumbs>
        </>
    )
}

export default PageBreadcrumb