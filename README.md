
# SearchBox like Google

Fully customizable and responsive ready-to-use <SearchBox> component like Google.

# Installation

```bash
npm install react-searchbox-like-google
```
or
```bash
yarn add react-searchbox-like-google
```

  
## Import

```javascript
import SearchBox from 'react-searchbox-like-google'
```

You can also import types if you needed.
```javascript
import SearchBox { IOnClickData, ISearchResults } from 'react-searchbox-like-google'
```
## Usage


With required props.
```javascript
         <SearchBox
            onChange={handleOnChange}
            onClick={handleOnclick}
            results={results}
          />
```

With all props.

```jsx
          <SearchBox
            onChange={handleOnChange}
            onClick={handleOnclick}
            results={asyncResults}
            darkMode={darkMode}
            placeHolder='Search Movies e.g. The Matrix'
            showDetail
            showImage
            limit={10}
            thresHold={1}
            sx={{
              mainBackground: '#ffffff',
              darkThemeColor: '#202124',
              borderRadius: 24,
              transitionDuraiton: 150
            }}
            buttons={[
              { label: 'Search', handler: btn1handler },
              { label: 'Do something', handler: btn2handler }
            ]}
          />
```

  
## Props

| Prop      | Type     | Description                |
| :-------- | :------- | :------------------------- |
|`onChange` |`(onChangeData: string) => void`| A function that triggers when you typing. Callback function parameter provides input value.|
|`onClick`|`(onClickData: IOnClickData) => void`| A function that triggers when you select any of results. Callback function parameter provides selected result's data. |
|`results` | `ISearchResults[]` | Array of objects. [More details.](#results)|
|`limit`|`number`| Limit of search results displayed at once. **Default is 10 (7 on mobile)**|
|`thresHold`|`number`| onChange function works when length of value greater than threshold. **Default value is 1** |
|`placeHolder`|`string`| Placeholder |
|`showImage`|`boolean`| If true, images are displayed on search results. **Default value is false**|
|`showDetail`|`boolean`|If true, details are displayed on search results. **Default value is false**|
|`darkMode`|`boolean`| Dark mode state.|
|`sx`|`object`| Contains style properties. [More details.](#styling)|
|`buttons`|`array`| Contains buttons. [More details.](#buttons) |

## Results

Every single object in result array should have the following structure. id and title are required.

```javascript
interface ISearchResults {
  id: number
  title: string
  image?: string
  detail?: string
  href?: string
}
```
## Stylings
```javascript
sx?: {
    mainBackground?: string             // default  #ffffff
    textColor?: string                  // default  #1f2937
    highlightColor?: string             // default  #1f2937
    darkThemeColor?: string             // default  #202124   
    borderRadius?: BorderRadiusRange    // number between 0-24. default 24
    transitionDuraiton?: number         // default 150 (ms)
  }
```
## Buttons
Default value is **undefined**. When the value is undefined, no buttons are displayed at the bottom of the search results.
You can create one or two.


```javascript
 buttons?: [
    btn1?: { label: string, handler: (onChangeData: IOnClickData) => void },
    btn2?: { label: string, handler: (onChangeData: IOnClickData) => void },
  ]
```
## Licence

[MIT](https://choosealicense.com/licenses/mit/) Alptuğ İdin

  
