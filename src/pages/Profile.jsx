import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import axios from 'axios'
import MyBooking from './MyBooking'
const TabPane = Tabs
const Profile = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Tab 1" key="1">
                   <MyBooking />
                </TabPane>
                <TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </TabPane>
            </Tabs>
        </div>
    )
}

export default Profile

