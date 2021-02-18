import React from 'react'
import {useFormik} from 'formik';
import {Button, Form, Input} from 'antd';
import {useDispatch} from 'react-redux';
import {addNewUser} from '../../redux/tableReducer';

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
        errors.firstName = 'First name should only contain latin letters';
    }

    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (/[^A-Za-z]/.test(values.lastName)) {
        errors.lastName = 'Last name should only contain latin letters';
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


export const AddNewUserForm = () => {
    const dispatch = useDispatch()

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
            dispatch(addNewUser(values))

        },
    });


    return (
        <div>
            <Form onFinish={formik.handleSubmit} layout='horizontal' size='small'>
                <Form.Item label='ID' validateStatus={formik.touched.id && formik.errors.id ? 'error' : ''}>
                    <Input
                        id='id'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.id}
                    />
                    {formik.touched.id && formik.errors.id ? <div style={{color: 'red'}}>{formik.errors.id}</div> : null}
                </Form.Item>
                <Form.Item label='First name' validateStatus={formik.touched.firstName && formik.errors.firstName ? 'error' : ''}>
                    <Input
                        id='firstName'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? <div style={{color: 'red'}}>{formik.errors.firstName}</div> : null}
                </Form.Item>
                <Form.Item label='Last name' validateStatus={formik.touched.lastName && formik.errors.lastName ? 'error' : ''}>
                    <Input
                        id='lastName'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? <div style={{color: 'red'}}>{formik.errors.lastName}</div> : null}
                </Form.Item>
                <Form.Item label='Email' validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}>
                    <Input
                        id='email'
                        type='email'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                </Form.Item>
                <Form.Item label='Phone' validateStatus={formik.touched.phone && formik.errors.phone ? 'error' : ''}>
                    <Input
                        id='phone'
                        type='text'
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.phone}
                    />
                    {formik.touched.phone && formik.errors.phone ? <div style={{color: 'red'}}>{formik.errors.phone}</div> : null}
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit' disabled={!formik.isValid}>Add</Button>
                </Form.Item>
            </Form>
        </div>
    )
}