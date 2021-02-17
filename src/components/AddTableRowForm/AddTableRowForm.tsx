import React from 'react'
import {useFormik} from 'formik';
import {Button, Form, Input} from 'antd';

type FormValuesType = {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
}

const validate = (values: FormValuesType) => {
    const errors = {} as FormValuesType;
    if (!values.id) {
        errors.id = 'Required';
    } else if (/\D/.test(values.id)) {
        errors.id = 'Id should only contain numbers';
    }

    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (/[^A-Za-z]/.test(values.firstName)) {
        errors.firstName = 'First name should only contain letters';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (/[^A-Za-z]/.test(values.lastName)) {
        errors.lastName = 'Last name should only contain letters';
    }

    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.phone) {
        errors.phone = 'Required';
    } else if (!/\(\d{3}\)\d{3}-\d{4}/.test(values.phone)) {
        errors.phone = 'Phone should be (xxx)xxx-xxxx';
    }

    return errors;
};


export const AddTableRowForm = () => {

    const formik = useFormik({
        initialValues: {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        },
        validate,
        onSubmit: values => {
            console.log(values)
        },
    });


    return (
        <div>
            <Form onFinish={formik.handleSubmit} >
                <Form.Item label='ID'>
                    <Input
                        id='id'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.id}
                    />
                    {formik.touched.id && formik.errors.id ? <div>{formik.errors.id}</div> : null}
                </Form.Item>
                <Form.Item label='First name'>
                    <Input
                        id='firstName'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                </Form.Item>
                <Form.Item label='Last name'>
                    <Input
                        id='lastName'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                </Form.Item>
                <Form.Item label='Email'>
                    <Input
                        id='email'
                        type='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                </Form.Item>
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <Form.Item label='Phone'>
                    <Input
                        id='phone'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? <div>{formik.errors.phone}</div> : null}
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    )
}