第一版：正常数独游戏

网页显示9X9的格子，玩家点击出题按钮后，随机出题。

之后玩家可以在空白格子填入数字，每次填入后，你都需要调用js程序判断当前的回答是否符合要求。

直到全部空格填满之后，还需要判断用户是否解答正确。



第二版：把实现后端保存功能

在第一版的基础上，每次随机出题之后，都把当前题目保存到后端数据库中，并且生成一个唯一的题目ID，跳转到题目页面，如路由可以是 /game/18256 。

玩家每次填写的记录也保存起来，填几次就保存几次，也就是可以记录玩家游戏每一步骤情况。

最后玩家的游戏结果也需要保存。



第三版：重放游戏步骤

在第二版的基础上，没有玩完的题目，可以下次打开继续玩。

已经玩结束的题目，可以按照步骤回放。

可以是自动一步一步回放，也可以是手动点击上一步下一步回放。



第四版：允许用户录入题目

在第三版的基础上，玩家既可以选择随机出题，也可以选择手动录入题目。

玩家选择录入题目后，网页显示9X9的格子，每一个格子都可以输入数字，玩家可以把别的地方看到的题目录入进去，最后保存题目。

保存之后，生成唯一的题目ID，跳转到题目页面。

之后流程跟前面几版一样。



第五版：实现JS自动解题

在第四版的基础上，这次玩家可以不自己答题，而是点击解答按钮，让程序来给出答案。

你需要用JS实现一个解答数独的算法，说是算法，其实不要被吓倒，你就把我们人答题的整个过程都用程序来实现就可以了，暂时不需要上其它更高深的算法。

我们用程序循环遍历每一个空格，找到这个空格所在的3x3正方形，以及横向和竖向的，总共三组数字，每一组数字都要求必须有1到9，且不能重复。

你写一个函数判断当前格子是否可以确定要填哪个数字，如果不能确定，就跳过这个格子，跳到下一个格子，继续重复这个过程，直到所有格子都被解答出来了。

这里程序运行可能会很快，你可以每次在确定一个格子的数字后暂停2秒钟，之后再继续找下一个可以确定的格子，这样就可以让玩家看清楚整个游戏过程。

注意，这里程序答题也一样要每个步骤保存到后端，确保游戏结束后可以回放。



第六版：让GPT来讲解

在第五版的基础上，每次确定一个格子的数字后，就调用GPT接口，传入三组数字和正确答案的数字，让GPT来讲解，为什么要这样做，为什么能够确定这个格子的数字。

使用流式传输，把GPT的回答显示到页面上。

几个注意事项：

这里需要识别用户浏览器语言，或者让用户选择语言，然后使用这个指定的语言来让GPT输出文字；

这一步，就不是每次暂停2秒了，而是需要等GPT回答完之后，才开始下一个格子的探索；

这次还要把GPT的输出文字也保存起来，最后支持回放。




第七版：接入TTS实现语音讲解

在第六版的基础上，接入TTS，让GPT的回答可以语音播放出来。

依然需要把语音也保存起来，支持回放时语音讲解。



能够实现以上版本，就足够去做一些可以赚钱的小工具了。哥飞还给学有余力的同学准备了两个版本的附加题。

第八版：尝试合成视频

在之前的基础上，把讲解录制成视频。

这里有两个方案，你可以后端渲染图片最终生成视频，也可以用一些前端库，直接在前端录制视频。

注意不管前后端生成视频，都需要把语音讲解也合成进去，最后得到一个讲解数独游戏的视频。



第九版：尝试OCR

在之前的基础上，实现上传图片，或者调用摄像头读取数独题目，识别每一个格子的数字，特别要注意空格的处理，之后保存题目，生成题目ID。



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
