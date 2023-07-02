import * as React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { Box, Container } from 'theme-ui'
import { format, addMinutes } from 'date-fns'
import metadata from '../constants/metadata.json'
import { VStack } from '../components/Stack'
import { HeaderName, HeaderTitle } from '../components/Header'
import { Meta } from '../types/posts'

interface ClimbingPostProps {
	meta: Meta
}
