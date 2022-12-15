import {useState} from 'react';
import {useNavigate, Link} from '@shopify/hydrogen/client';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

import {emailValidation, passwordValidation} from '~/lib/utils';

/* import {callLoginApi} from './AccountLoginForm.client'; */
import {getInputStyleClasses} from '../../lib/styleUtils';

interface FormElements {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

export function EventCreateForm({userId}) {
  const navigate = useNavigate();

  const [submitError, setSubmitError] = useState<null | string>(null);
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [links, setLink] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');

  async function onSubmit(
    event: React.FormEvent<HTMLFormElement & FormElements>,
  ) {
    event.preventDefault();

    setSubmitError(null);

    const eventCreateResponse = await callEventCreateApi({
      name,
      description,
      startDate,
      links,
      location,
      city,
      userId
    });
console.log('ffff', eventCreateResponse)
    if (eventCreateResponse.error) {
      setSubmitError(eventCreateResponse.error);
      return;
    }

   /*  navigate('/events'); */
  }


  console.log('userId', userId)


  return (
    <div className="flex justify-center my-24 px-4">
      <div className="max-w-md w-full">
        <h1 className="text-4xl">Create an Event.</h1>
        <form noValidate className="pt-6 pb-8 mt-4 mb-4" onSubmit={onSubmit}>
          {submitError && (
            <div className="flex items-center justify-center mb-6 bg-zinc-500">
              <p className="m-4 text-s text-contrast">{submitError}</p>
            </div>
          )}
          <div className="mb-3">
            <input
              className={`mb-1`}
              id="name"
              name="name"
              type="text"
              required
              placeholder="Event name"
              aria-label="Event name"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <input
              className={`mb-1`}
              id="links"
              name="links"
              type="text"
              required
              placeholder="Link"
              aria-label="Link"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={links}
              onChange={(event) => {
                setLink(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <input
              className={`mb-1`}
              id="location"
              name="location"
              type="text"
              required
              placeholder="Event location"
              aria-label="Event location"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={location}
              onChange={(event) => {
                setLocation(event.target.value);
              }}
            />
          </div>

          <div className="mb-3">
            <input
              className={`mb-1`}
              id="city"
              name="city"
              type="text"
              required
              placeholder="City"
              aria-label="City"
              // eslint-disable-next-line jsx-a11y/no-autofocus
              autoFocus
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
          </div>

        <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
          <div className="mb-3">
            <textarea
              className={`mb-1`}
              id="description"
              name="description"
              placeholder="description"
              aria-label="description"
              value={description}
              minLength={8}
              required
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
              type="submit"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function callEventCreateApi({
  name,
  description,
  startDate,
  links,
  location,
  city,
  userId
}: {
  name: string;
  description: string;
  startDate: Date;
  links: string;
  location: string;
  city: string;
  userId: string;
}) {
  try {
    console.log('datasent', name, description, startDate)
    const res = await fetch(`${window.location.origin}/api/events`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        description,
        startDate,
        links,
        location,
        city,
        userId,
      }),
    });

    if (res.status === 200) {
      return {};
    } else {
      return res.json();
    }
  } catch (error: any) {
    return {
      error: error.toString(),
    };
  }
}
