import { CaretDown, Eye, EyeClosed } from "@phosphor-icons/react";
import { Form, Input, Select } from "antd";
import { Controller } from "react-hook-form";
import styled from "styled-components";

export const MaskedFormInput = styled(Form.Item)`
  .ant-form-item-label {
    label {
      width: 100% !important;
      color: white;
      div {
        width: 100%;
      }

      span {
        &:empty {
          display: none;
          margin: 0px;
        }

        + span {
          a {
            font-size: 12px;
          }
        }
      }

      &:after {
        margin: 0px;
        content: "";
      }
    }
  }
  input {
    border: 1px solid ${({ theme }) => theme.colors.gray200};
    padding: ${({ theme }) => theme.input.paddingBig};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
    border-radius: ${({ theme }) => theme.borderRadius.border8};

    box-sizing: border-box;
    margin: 0;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    list-style: none;
    position: relative;
    display: inline-block;
    width: 100%;
    min-width: 0;
    background-color: ${({ theme }) => theme.colors.colorWhite};
    background-image: none;
    transition: all 0.2s;

    &:focus,
    &:hover {
      border-color: ${({ theme }) => theme.colors.gray400};
      box-shadow: ${({ theme }) => theme.colors.boxShadow};
    }

    &:placeholder {
      color: ${({ theme }) => theme.colors.gray400};
    }
  }

  .ant-input-suffix {
    svg {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }

  .ant-input-password {
    .ant-input {
      box-shadow: none;
    }
    &:not(.ant-input-affix-wrapper-disabled) {
      &:hover {
        border-color: ${({ theme }) => theme.colors.gray400};
        box-shadow: ${({ theme }) => theme.colors.boxShadow};
      }
    }

    + div[style] {
      > div {
        + p {
          line-height: 1.2;
          text-transform: capitalize;
        }
      }
    }
  }

  &.error {
    label {
      color: ${({ theme }) => theme.colors.error} !important;

      span.ant-form-item-tooltip {
        color: ${({ theme }) => theme.colors.error};
      }
    }
    input {
      border: 1px solid #f7cec8;
      color: ${({ theme }) => theme.colors.error} !important;
      box-shadow: 0px 1px 2px 0px rgba(24, 24, 27, 0.04);
    }

    .ant-input-password {
      border: 1px solid #f7cec8;
      box-shadow: 0px 1px 2px 0px rgba(24, 24, 27, 0.04);

      .ant-input {
        box-shadow: none;
        border: 0px;
      }
    }

    .ant-select-selector {
      border: 1px solid #f7cec8 !important;
    }

    .ant-picker {
      border: 1px solid #f7cec8 !important;

      input {
        border-color: transparent !important;
        box-shadow: none !important;
      }
    }
  }
  .ant-form-item-control-input-content {
    ul {
      li {
        display: flex;
        align-items: center;
        span {
          opacity: 1;
          padding-left: 10px;
        }
        svg {
          font-size: 18px;
        }
        &.valid {
          color: ${({ theme }) => theme.colors.colorGreen} !important;
        }
        &.invalid {
          color: ${({ theme }) => theme.colors.error} !important;
        }
      }
    }
  }
`;
const DangerText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.para12};
  margin-left: 0px !important;
  color: rgba(208, 14, 23, 0.8);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  width: 100%;
  text-align: right;
  display: block;
  margin-top: 8.5px;

  + div[style] {
    > div {
      + p {
        line-height: 1.2;
        text-transform: capitalize;
      }
    }
  }
`;

const CustomInput = styled(Input)`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.input.paddingBig};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius.border8};

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray300};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }

  &:placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const CustomPasswordInput = styled(Input.Password)`
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  padding: ${({ theme }) => theme.input.paddingBig};
  box-shadow: ${({ theme }) => theme.colors.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius.border8};

  &:focus,
  &:hover {
    border-color: ${({ theme }) => theme.colors.gray300};
    box-shadow: ${({ theme }) => theme.colors.boxShadow};
  }

  &:placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

const CustomSelect = styled(Select)`
  .ant-select-selector {
    border: 1px solid ${({ theme }) => theme.colors.gray200} !important;
    padding: ${({ theme }) => theme.input.paddingSmall} !important;
    box-shadow: ${({ theme }) => theme.colors.boxShadow} !important;
    border-radius: ${({ theme }) => theme.borderRadius.border8};
    height: auto !important;

    &:focus,
    &:hover {
      border-color: ${({ theme }) => theme.colors.gray300};
      box-shadow: ${({ theme }) => theme.colors.boxShadow};
    }

    .ant-select-selection-search {
      .ant-select-selection-search-input {
        height: 46px;
      }
    }
    .ant-select-selection-item {
      line-height: normal;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }

  &.ant-select-open {
    .ant-select-selector {
      border-color: ${({ theme }) => theme.colors.gray300} !important;
      box-shadow: ${({ theme }) => theme.colors.boxShadow} !important;
    }
  }

  .ant-select-arrow {
    right: 16px;
  }

  &.error {
    .ant-select-selector {
      border: 1px solid #f7cec8 !important;
      box-shadow: 0px 1px 2px 0px rgba(24, 24, 27, 0.04);

      .ant-select-selection-placeholder {
        color: ${({ theme }) => theme.colors.error};
      }
    }
  }
`;

const Label = ({ label, required, extraLabel }) => {
  return extraLabel ? (
    <div className="d-flex justify-content-between">
      <span>{`${label || ""} ${required ? "*" : ""}`}</span>
      {extraLabel}
    </div>
  ) : (
    `${label || ""} ${required ? "*" : ""}`
  );
};

export function FormTextFormField({
  control,
  name,
  defaultValue = "",
  placeholder,
  required,
  errors,
  label,
  type,
  hint,
  tooltip,
  extraLabel,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          tooltip={tooltip}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && "error"}`}
        >
          <CustomInput
            placeholder={placeholder || label}
            value={props.field.value}
            type={type}
            onChange={(e) => props.field.onChange(e.target.value)}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  );
}

export function FormPasswordFormField({
  control,
  name,
  defaultValue = "",
  placeholder,
  required,
  errors,
  label,
  hint,
  tooltip,
  extraLabel,
  hintLabel,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          tooltip={tooltip}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && "error"}`}
        >
          <CustomPasswordInput
            placeholder={placeholder || label}
            value={props.field.value}
            onChange={(e) => props.field.onChange(e.target.value)}
            iconRender={(visible) =>
              visible ? <Eye size={24} /> : <EyeClosed size={24} />
            }
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
          {hintLabel}
        </MaskedFormInput>
      )}
    />
  );
}

export function FormDropdownFormField({
  control,
  name,
  defaultValue = "",
  placeholder,
  required,
  errors,
  label,
  type,
  hint,
  tooltip,
  options,
  extraLabel,
  ...rest
}) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={(props) => (
        <MaskedFormInput
          label={
            <Label extraLabel={extraLabel} label={label} required={required} />
          }
          tooltip={tooltip}
          rules={[{ required, message: errors?.message }]}
          className={`mb-3 mb-md-4 ${errors?.message && "error"}`}
        >
          <CustomSelect
            placeholder={placeholder}
            onSelect={(data) => {
              props.field.onChange(data);
            }}
            suffixIcon={<CaretDown />}
            options={options}
            value={props.field.value}
            {...rest}
          />
          {errors && (
            <DangerText className="danger">
              {errors?.message || hint}
            </DangerText>
          )}
        </MaskedFormInput>
      )}
    />
  );
}
