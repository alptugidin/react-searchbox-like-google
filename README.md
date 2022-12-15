
<p align="center">
<img src='https://user-images.githubusercontent.com/31244930/203983970-81c94aca-5a53-4372-b627-e0e476fd32c1.png' />
</p>
<p align="center">
Fully customizable and responsive ready-to-use SearchBox component like Google.
<br>
<br>
<a target="_blank" href="https://alptugidin.github.io/react-searchbox-like-google/">Demo</a>
<br>
<br>
</p>
 
<p align="center">
<a href="https://badge.fury.io/js/react-searchbox-like-google">
<img src="https://badge.fury.io/js/react-searchbox-like-google.svg" />
<img alt="npm" src="https://img.shields.io/npm/dt/react-searchbox-like-google.svg">
</a>
</p>

<p align="center">
<img width="400" src="https://user-images.githubusercontent.com/31244930/202501697-ab69e036-edbb-4607-a9d2-c4768f2ff5a8.gif"/>
<br>
<img width="400" src="https://user-images.githubusercontent.com/31244930/202501712-6712414a-9ea8-4cc5-887b-0678d4658cdc.gif"/>
</p>




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


### With required props.
```javascript
         <SearchBox
            onChange={handleOnChange}
            onClick={handleOnclick}
            results={results}
          />
```

### With all props.

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
### Handlers

```jsx
  //All parameters are optional.
  const handleOnclick = (onClickData: IOnClickData): void => {
    console.log(onClickData);
  };

  const handleOnChange = (onChangeData: string): void => {
    setQuery(onChangeData);
  };
```


  
## Props

| Prop      | Type      | Description                |
| :-------- | :------- | :------------------------- |
|`onChange` |<code>(onChangeData:&nbsp;string)&nbsp;=>&nbsp;void</code>  | A function that triggers when you typing. Callback function parameter provides input value.|
|`onClick`|<code>(onClickData:&nbsp;IOnClickData)&nbsp;=>&nbsp;void</code>| A function that triggers when you select any of results. Callback function parameter provides selected result's data. |
|`results` | `ISearchResults[]` | Array of objects. [More details.](#results)|
|`limit`|`number`| Limit of search results displayed at once. **Default is 10 (7 on mobile)**|
|`thresHold`|`number`| onChange function works when length of value greater than threshold. **Default value is 1** |
|`placeHolder`|`string`| Placeholder |
|`showImage`|`boolean`| If true, images are displayed on search results. **Default value is false**|
|`showDetail`|`boolean`|If true, details are displayed on search results. **Default value is false**|
|`darkMode`|`boolean`| Dark mode state.|
|`sx`|`object`| Contains style properties. [More details.](#styling) |
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

### Button Handlers

```jsx
  //All parameters are optional.
  const btn1handler = (onClickData: IOnClickData): void => {
    console.log('Button 1 clicked!');
    console.log(onClickData);
  };

  const btn2handler = (): void => {
    console.log('Button 2 clicked!');
  };
```
## Licence

[MIT](https://choosealicense.com/licenses/mit/) Alptuğ İdin

  
