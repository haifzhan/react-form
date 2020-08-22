import React, { useState, userEffect, useRef, useEffect } from 'react';
import Header from './Header';
import Section from './Section';
import List from './List';
import Form from '../example2/Form';
import axios from 'axios';


const sortRecords = records =>
    records.sort((a, b) => {
        if (a.recordName < b.recordName) {
            return -1;
        }
        if (a.recordName > b.recordName) {
            return 1;
        }
        return 0;
    });

const Container = () => {
    const [records, setRecords] = useState([]);
    const [liveText, setLiveText] = useState('');
    const isMounted = useRef(true);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/records', {
                headers: {
                    'Cache-Control': 'private',
                    'X-Custom-Header': 'some-value'
                },
            });
            if (isMounted.current) {
                setRecords(sortRecords(data));
            }
        };
        fetchData();
        return () => {
            isMounted.current = false;
        }

    }, []);

    const onSubmitHandler = async (entry) => {
        const { data } = await axios.post('/api/records', entry);
        console.log({ data });
        if (isMounted.current) {
            setRecords(sortRecords([...records, data]));
            setLiveText(`${entry.recordName} successfully added.`);
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main>
                <Section headingText="Add a new favourite">
                    <Form onSubmit={onSubmitHandler} />
                </Section>
                <Section headingText="Records">
                    <List records={records} />
                </Section>
            </main>
            <div aria-live="polite" aria-atomic="true">{liveText}</div>
        </div>
    );
}

export default Container;