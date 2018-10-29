import Mock from 'mockjs'

// 获取 mock.Random 对象
const Random = Mock.Random

export default {
    list(request) {
        let {offset, limit, key, type, date} = JSON.parse(request.body)
        let projects = []
        for (let i = 0; i < limit; i++) {
            let newProjectObject = {
                id: Random.string('lower', 16, 16),
                Name: Random.csentence(15, 30), //  Random.csentence( min, max )
                Number: Random.string('upper', 5, 15), //  Random.csentence( min, max )
                thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
                author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
                Create_Date: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
                Create_By: Random.cname()//
            }
            // console.log(type)

            switch (type) {
                case '-1':
                    newProjectObject.Status = Random.integer(100, 102) + ''
                    break
                case '100':
                    newProjectObject.Status = Random.integer(100, 100) + ''
                    break
                case '101':
                    newProjectObject.Status = Random.integer(101, 101) + ''
                    break
                case '102':
                    newProjectObject.Status = Random.integer(102, 102) + ''
                    break
            }
            projects.push(newProjectObject)
        }
        return {
            data: {
                list: projects,
                count: 100
            },
            status: 1,
            msg: ''
        }
    },
    detail(request) {
        let {id} = JSON.parse(request.body)
        let project = {
            id,
            Name: Random.csentence(15, 30), //  Random.csentence( min, max ):
            Number: Random.string('upper', 5, 15), //  Random.csentence( min, max )
            Create_Date: Random.date(), // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
            Create_By: Random.cname(),
            Status: Random.integer(100, 100) + ''
        }
        return {
            data: project,
            status: 1,
            msg: ''
        }
    }
}