import styled from "styled-components";

const Headings = styled.div`
    margin-bottom: 24px;
`
const Heading = styled.h1`
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.colorBlack};
    line-height: normal;
    text-align: left;

    @media screen and (max-width: 767px){
        font-size: ${({ theme }) => theme.fontSize.para18};
        font-weight: ${({ theme }) => theme.font.medium};
        margin-bottom: 4px;
    }
`
const SubHeading = styled.h3`
    margin-bottom: 6px;
    color: ${({ theme }) => theme.colors.colorBlack};
    line-height: normal;
    font-size: 20px;
    text-align: left;
`
const SubHeader = styled.p`
    color: ${({ theme }) => theme.colors.gray400};
    margin-bottom:0px;
    font-size: ${({ theme }) => theme.fontSize.para14};
    letter-spacing: 0.14px;
    line-height: 1.2;
    text-align: left;
`

export function CustomHeading({ heading,subHeading,subHeader }) {
	return (
		<Headings>
			{heading && <Heading>{heading}</Heading>}
            {subHeading && <SubHeading>{subHeading}</SubHeading>}
			<SubHeader>{subHeader}</SubHeader>
		</Headings>
	)
}